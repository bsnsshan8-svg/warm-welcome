import { useEffect } from "react";
import { loadMotion, scrollHomeTo, setHomeScroller } from "@/lib/home-motion";

/** One home-page scrolling owner; no browser libraries enter the SSR module graph. */
export function HomeMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let teardown: (() => void) | undefined;
    let generation = 0;
    const setup = async () => {
      const run = ++generation;
      teardown?.(); teardown = undefined;
      if (reduced.matches) return;
      const [[{ gsap }, { ScrollTrigger }], { default: Lenis }] = await Promise.all([loadMotion(), import("lenis")]);
      if (disposed || run !== generation) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1, syncTouch: false, autoRaf: false, prevent: node => node.classList.contains("moments-viewport") || node.closest(".zaad-mobile-menu") !== null });
      setHomeScroller(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
      const ctx = gsap.context(() => {
        const reveal = (items: Element[], trigger: Element) => {
          if (!items.length) return;
          gsap.set(items, { y: 30, opacity: 0 });
          gsap.to(items, { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger, start: "top 85%", once: true } });
        };
        document.querySelectorAll(".sx-head, .px-head, .zx-approach-left, .zx-final-inner").forEach(group => reveal(Array.from(group.querySelectorAll(":scope > h2, :scope > .sx-kicker")), group));
        document.querySelectorAll(".problem-grid-x, .ge-grid, .zx-approach-items, .pr-grid, .zx-stats").forEach(grid => reveal(Array.from(grid.children), grid));
      }, ".journey-page");
      const refresh = () => { if (!disposed && run === generation) { lenis.resize(); ScrollTrigger.refresh(); } };
      void document.fonts.ready.then(refresh);
      const images = Array.from(document.images);
      images.forEach(image => { image.addEventListener("load", refresh); image.addEventListener("error", refresh); });
      refresh();
      teardown = () => { images.forEach(image => { image.removeEventListener("load", refresh); image.removeEventListener("error", refresh); }); ctx.revert(); gsap.ticker.remove(tick); lenis.off("scroll", ScrollTrigger.update); setHomeScroller(); lenis.destroy(); };
    };
    const anchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      event.preventDefault(); history.pushState(null, "", url.hash); scrollHomeTo(decodeURIComponent(url.hash));
    };
    const hash = () => { if (location.hash) scrollHomeTo(decodeURIComponent(location.hash)); };
    void setup(); reduced.addEventListener("change", setup);
    document.addEventListener("click", anchor); window.addEventListener("hashchange", hash); window.addEventListener("popstate", hash);
    return () => { disposed = true; generation++; teardown?.(); reduced.removeEventListener("change", setup); document.removeEventListener("click", anchor); window.removeEventListener("hashchange", hash); window.removeEventListener("popstate", hash); };
  }, []);
  return null;
}