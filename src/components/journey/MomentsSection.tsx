import { useEffect, useRef, useState } from "react";
import { ArrowDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SceneArt } from "@/components/journey/SceneArt";
import { chapters } from "@/lib/zaad-journey";
import { headerHeight, loadMotion, scrollHomeTo, setMomentPositions } from "@/lib/home-motion";

const moments = chapters.slice(3, 6);
const clamp = (n: number, max = 1) => Math.max(0, Math.min(max, n));

export function MomentsSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const goRef = useRef<(i: number) => void>(() => {});
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current, track = trackRef.current;
    const viewport = track?.parentElement;
    const pin = wrapper?.querySelector<HTMLElement>(".moments-pin");
    if (!wrapper || !track || !viewport || !pin) return;
    const panels = Array.from(track.querySelectorAll<HTMLElement>(".moment-panel"));
    let disposed = false;
    let selected = 0;
    let cleanup: (() => void) | undefined;
    const select = (index: number) => {
      const nearest = Math.round(clamp(index, panels.length - 1));
      if (nearest !== selected) { selected = nearest; setActive(nearest); }
      panels.forEach((panel, i) => { panel.dataset['active'] = String(i === nearest); panel.dataset['visible'] = String(i === nearest); });
    };
    goRef.current = i => { const moment = moments[Math.round(clamp(i, panels.length - 1))]; if (moment) scrollHomeTo(moment.id); };
    const key = (event: KeyboardEvent) => {
      if (event.defaultPrevented || document.querySelector('[role="dialog"]') || event.target instanceof HTMLElement && event.target.closest("input,textarea,select,[contenteditable=true]")) return;
      const r = pin.getBoundingClientRect();
      if (r.top >= window.innerHeight || r.bottom <= headerHeight() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); goRef.current(selected + (event.key === "ArrowRight" ? 1 : -1)); }
    };
    window.addEventListener("keydown", key);
    void loadMotion().then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)", reduce: "(prefers-reduced-motion: reduce)" }, context => {
        const desktop = context.conditions?.['desktop'], reduce = context.conditions?.['reduce'];
        wrapper.style.setProperty("--moments-header", `${headerHeight()}px`);
        panels.forEach(panel => { panel.style.setProperty("--p", "1"); panel.style.setProperty("--scene-drift", "0"); });
        let mobileScroll: (() => void) | undefined;
        if (desktop && !reduce) {
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          const progress = wrapper.querySelector(".moments-progress i");
          const travel = gsap.fromTo(track, { x: 0 }, {
            x: () => -distance(), ease: "none",
            onUpdate: function (this: { progress: () => number }) { const value = this.progress(); select(value * (panels.length - 1)); if (progress) gsap.set(progress, { scaleX: value }); },
            scrollTrigger: { id: "patient-moments", trigger: wrapper, pin, pinSpacing: true, start: () => `top top+=${headerHeight()}`, end: () => `+=${distance() * 1.1}`, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
              snap: { snapTo: 1 / (panels.length - 1), duration: { min: 0.25, max: 0.6 }, delay: 0.08, ease: "power2.inOut" },
            },
          });
          panels.forEach(panel => {
            const content = panel.querySelectorAll(".chapter-eyebrow, h2, .moment-copy > p, .chapter-points, .chapter-stars");
            const art = panel.querySelector(".scene-art");
            const graphic = panel.querySelector(".moment-graphic");
            gsap.fromTo(content, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: travel, start: "left 80%", end: "left 40%", scrub: true } });
            if (art) gsap.fromTo(art, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: travel, start: "left 80%", end: "left 40%", scrub: true } });
            if (graphic) gsap.fromTo(graphic, { x: () => -viewport.clientWidth * 0.075 }, { x: () => viewport.clientWidth * 0.075, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: travel, start: "left right", end: "right left", scrub: true, invalidateOnRefresh: true } });
          });
          setMomentPositions(id => {
            const index = moments.findIndex(m => m.id === id);
            const st = travel.scrollTrigger;
            return index >= 0 && st ? st.start + (st.end - st.start) * index / (panels.length - 1) : undefined;
          });
          ScrollTrigger.refresh();
        } else {
          gsap.set(track, { clearProps: "transform" });
          const update = () => select(panels.reduce((best, panel, i) => Math.abs(panel.offsetLeft - viewport.scrollLeft - viewport.clientWidth * 0.06) < Math.abs((panels[best]?.offsetLeft ?? 0) - viewport.scrollLeft - viewport.clientWidth * 0.06) ? i : best, 0));
          if (!reduce) { mobileScroll = update; viewport.addEventListener("scroll", update, { passive: true }); update(); }
          setMomentPositions(id => {
            const index = moments.findIndex(m => m.id === id);
            const panel = panels[index];
            if (!panel) return;
            if (reduce) return panel.getBoundingClientRect().top + window.scrollY - headerHeight();
            viewport.scrollTo({ left: panel.offsetLeft - viewport.clientWidth * 0.06, behavior: "smooth" });
            return wrapper.getBoundingClientRect().top + window.scrollY - headerHeight();
          });
        }
        select(selected);
        const initial = window.setTimeout(() => { if (moments.some(m => `#${m.id}` === location.hash)) scrollHomeTo(location.hash); }, 100);
        return () => { clearTimeout(initial); if (mobileScroll) viewport.removeEventListener("scroll", mobileScroll); setMomentPositions(); };
      });
      cleanup = () => mm.revert();
    });
    return () => { disposed = true; cleanup?.(); window.removeEventListener("keydown", key); setMomentPositions(); };
  }, []);

  return <section id="moments" ref={wrapperRef} className="moments-section" aria-label="Patient moments">
    <div className="moments-pin">
      <div className="moments-viewport"><div className="moments-track" ref={trackRef}>
        {moments.map((chapter, k) => <section id={chapter.id} key={chapter.id} className="moment-panel" aria-labelledby={`moment-title-${k}`} data-active={k === active}>
          <div className="moment-layout">
            <div className="chapter-content moment-copy">
              <div className="chapter-eyebrow">{chapter.label}</div>
              <h2 id={`moment-title-${k}`}>{chapter.title.trim()}<br /><em>{chapter.accent.trim()}</em></h2>
              <p>{chapter.text}</p>
              <ul className="chapter-points">{chapter.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
              <p className="chapter-why"><strong>Why it matters:</strong> {chapter.why}</p>
              {k === 1 && <div className="chapter-stars" aria-label="5-star rating">{Array.from({ length: 5 }, (_, n) => <Star key={n} size={18} fill="currentColor" />)}</div>}
            </div>
            <div className="moment-graphic"><SceneArt index={k + 3} /></div>
            <div className="scene-caption"><span className="caption-marker" /><div><span>{chapter.scene}</span><p>{chapter.detail}</p></div></div>
          </div>
          <a className="moment-next" href={k === 2 ? "#approach" : `#${moments[k + 1]?.id}`} aria-label="Next section"><ArrowDown size={18} /></a>
        </section>)}
      </div></div>
      <nav className="moments-navigation" aria-label="Patient moments navigation">
        <div className="moments-progress" aria-hidden="true"><i /></div>
        <div className="moments-labels">{moments.map((m, i) => <Button key={m.id} variant="unstyled" size="unstyled" aria-label={m.label} aria-current={active === i ? "step" : undefined} onClick={() => goRef.current(i)}><i aria-hidden="true" /><span>{m.label}</span></Button>)}</div>
      </nav>
    </div>
  </section>;
}
