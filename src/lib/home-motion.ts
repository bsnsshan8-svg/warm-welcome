import type Lenis from "lenis";

let scrolling: Lenis | undefined;
let panelPosition: ((id: string) => number | undefined) | undefined;

export const headerHeight = () => document.querySelector(".journey-header")?.getBoundingClientRect().height ?? 76;
export const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const loadMotion = () => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
export function setHomeScroller(instance?: Lenis) { scrolling = instance; }
export function setMomentPositions(resolve?: (id: string) => number | undefined) { panelPosition = resolve; }
export function pauseHomeScroll() { scrolling?.stop(); }
export function resumeHomeScroll() { scrolling?.start(); }

/** Numeric destinations are already header-adjusted (for pinned panel positions). */
export function scrollHomeTo(target: string | HTMLElement | number) {
  const id = typeof target === "string" ? target.replace(/^#/, "") : undefined;
  const resolvedId = id && ["system", "flow", "manage"].includes(id) ? "modules" : id;
  const position = resolvedId ? panelPosition?.(resolvedId) : undefined;
  const destination = position ?? (resolvedId ? document.getElementById(resolvedId) : target);
  if (destination == null || typeof destination === "string") return;
  const offset = typeof destination === "number" ? 0 : -headerHeight();
  if (scrolling) scrolling.scrollTo(destination, { offset, duration: 1.2, easing: easeOutExpo });
  else window.scrollTo({ top: typeof destination === "number" ? destination : destination.getBoundingClientRect().top + window.scrollY + offset, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
}