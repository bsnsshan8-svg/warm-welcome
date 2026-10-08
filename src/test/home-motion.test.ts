import { afterEach, describe, expect, it, vi } from "vitest";
import type Lenis from "lenis";
import { easeOutExpo, pauseHomeScroll, resumeHomeScroll, scrollHomeTo, setHomeScroller, setMomentPositions } from "@/lib/home-motion";

afterEach(() => { setHomeScroller(); setMomentPositions(); document.body.innerHTML = ""; });

describe("Shared homepage scrolling", () => {
  const mockScroller = () => {
    const scroller = { scrollTo: vi.fn(), stop: vi.fn(), start: vi.fn(), resize: vi.fn() };
    setHomeScroller(scroller as unknown as Lenis);
    return scroller;
  };
  it("glides normal anchors with the header offset and prescribed easing", () => {
    document.body.innerHTML = '<header class="journey-header"></header><section id="modules"></section>';
    const header = document.querySelector("header");
    if (!header) throw new Error("Missing fixture");
    vi.spyOn(header, "getBoundingClientRect").mockReturnValue({ height: 76 } as DOMRect);
    const scroller = mockScroller();
    scrollHomeTo("#system");
    expect(scroller.scrollTo).toHaveBeenCalledWith(document.getElementById("modules"), { offset: -76, duration: 1.2, easing: easeOutExpo });
  });
  it("uses the exact scroll position for a horizontal moment", () => {
    const scroller = mockScroller();
    setMomentPositions(id => id === "reputation" ? 4321 : undefined);
    scrollHomeTo("#reputation");
    expect(scroller.scrollTo).toHaveBeenCalledWith(4321, { offset: 0, duration: 1.2, easing: easeOutExpo });
  });
  it("pauses for the menu and recalculates the range on resume", () => {
    const scroller = mockScroller();
    pauseHomeScroll(); resumeHomeScroll();
    expect(scroller.stop).toHaveBeenCalledOnce();
    expect(scroller.start).toHaveBeenCalledOnce();
    expect(scroller.resize).toHaveBeenCalledOnce();
  });
  it("has an ease-out curve with exact endpoints", () => {
    expect(easeOutExpo(0)).toBe(0);
    expect(easeOutExpo(0.5)).toBeGreaterThan(0.95);
    expect(easeOutExpo(1)).toBe(1);
  });
});