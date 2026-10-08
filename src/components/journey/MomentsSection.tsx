import { useEffect, useRef, useState } from "react";
import { ArrowDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SceneArt } from "@/components/journey/SceneArt";
import { chapters } from "@/lib/zaad-journey";

const moments = chapters.slice(3, 6);
const clamp = (n: number, max = 1) => Math.max(0, Math.min(max, n));

export function MomentsSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const goRef = useRef<(i: number) => void>(() => {});
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    const viewport = track.parentElement;
    if (!viewport) return;
    const panels = Array.from(track.querySelectorAll<HTMLElement>(".moment-panel"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0, previous = 0, current = 0, selected = -1;
    const entrances = panels.map(() => 0);
    const progress = panels.map(() => 1);
    const headerHeight = () => document.querySelector(".journey-header")?.getBoundingClientRect().height ?? 76;
    const start = () => wrapper.getBoundingClientRect().top + window.scrollY - headerHeight();
    const go = (i: number) => {
      const index = Math.round(clamp(i, 2));
      if (reduced.matches) panels[index]?.scrollIntoView({ behavior: "auto", block: "start" });
      else if (desktop.matches) window.scrollTo({ top: start() + (index + .5) * window.innerHeight, behavior: "smooth" });
      else viewport.scrollTo({ left: panels[index]?.offsetLeft ?? 0, behavior: "smooth" });
    };
    goRef.current = go;
    const update = (now: number) => {
      frame = 0;
      const dt = previous ? Math.min(64, now - previous) : 16;
      previous = now;
      const isDesktop = desktop.matches && !reduced.matches;
      const rect = wrapper.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > headerHeight();
      const raw = clamp((window.scrollY - start()) / (3 * window.innerHeight));
      const target = clamp(raw * 3 - .5, 2);
      current = isDesktop ? current + (target - current) * (1 - Math.exp(-dt / 180)) : 0;
      if (Math.abs(target - current) < .001) current = target;
      track.style.transform = isDesktop ? `translate3d(${-current * viewport.clientWidth}px,0,0)` : "none";
      wrapper.style.setProperty("--moments-progress", String(isDesktop ? raw : 0));
      const nearest = isDesktop ? Math.round(current) : reduced.matches ? 0 : panels.reduce((best, panel, i) => Math.abs(panel.offsetLeft - viewport.scrollLeft) < Math.abs((panels[best]?.offsetLeft ?? 0) - viewport.scrollLeft) ? i : best, 0);
      if (nearest !== selected) { selected = nearest; setActive(nearest); }
      let animating = isDesktop && current !== target;
      panels.forEach((panel, i) => {
        const visible = reduced.matches || (inView && (isDesktop ? Math.abs(current - i) < .6 : nearest === i));
        if (visible && !entrances[i]) { entrances[i] = now; progress[i] = 0; }
        if (!visible) entrances[i] = 0;
        if (visible && !reduced.matches) { progress[i] = clamp((now - entrances[i]) / 900); if (progress[i] < 1) animating = true; }
        panel.style.setProperty("--p", String(reduced.matches ? 1 : progress[i]));
        panel.style.setProperty("--scene-drift", String(isDesktop ? clamp(current - i + .25) * .4 : 0));
        panel.dataset.visible = String(visible);
        panel.dataset.active = String(i === nearest);
      });
      if (animating) frame = requestAnimationFrame(update);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { wrapper.style.setProperty("--moments-header", `${headerHeight()}px`); request(); };
    const anchor = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const index = moments.findIndex(m => `#${m.id}` === link?.getAttribute("href"));
      if (index < 0) return;
      event.preventDefault(); history.pushState(null, "", `#${moments[index]?.id}`); go(index);
    };
    const hash = () => { const index = moments.findIndex(m => `#${m.id}` === window.location.hash); if (index >= 0) go(index); };
    const key = (event: KeyboardEvent) => {
      if (event.defaultPrevented || document.querySelector('[role="dialog"]') || event.target instanceof HTMLElement && event.target.closest("input,textarea,select,[contenteditable=true]")) return;
      const r = wrapper.getBoundingClientRect();
      if (r.top >= window.innerHeight || r.bottom <= headerHeight() || reduced.matches) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); go(selected + (event.key === "ArrowRight" ? 1 : -1)); }
    };
    resize();
    const initial = window.setTimeout(hash, 100);
    window.addEventListener("scroll", request, { passive: true });
    viewport.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", resize);
    document.addEventListener("click", anchor);
    window.addEventListener("hashchange", hash);
    window.addEventListener("popstate", hash);
    window.addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(frame); clearTimeout(initial);
      window.removeEventListener("scroll", request); viewport.removeEventListener("scroll", request);
      window.removeEventListener("resize", resize); reduced.removeEventListener("change", resize);
      document.removeEventListener("click", anchor); window.removeEventListener("hashchange", hash);
      window.removeEventListener("popstate", hash); window.removeEventListener("keydown", key);
    };
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
            <SceneArt index={k + 3} />
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
