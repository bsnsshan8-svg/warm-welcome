import { describe, expect, it } from "vitest";
import { chapters, sceneProgress } from "@/lib/zaad-journey";

describe("ZAAD scroll journey", () => {
  it("keeps all eight chapters and the system/contact anchors", () => {
    expect(chapters).toHaveLength(8);
    expect(chapters[1]?.id).toBe("system");
    expect(chapters[7]?.id).toBe("contact");
    expect(new Set(chapters.map(chapter => chapter.id)).size).toBe(8);
  });
  it("holds the camera while chapter text is read then advances", () => {
    expect(sceneProgress(350, 1000).travel).toBe(0);
    expect(sceneProgress(800, 1000).travel).toBeGreaterThan(0);
    expect(sceneProgress(1000, 1000).travel).toBe(1);
  });
  it("clamps the camera path at the start and finish", () => {
    expect(sceneProgress(-100, 1000).travel).toBe(0);
    expect(sceneProgress(12000, 1000).travel).toBe(7);
    expect(Number.isFinite(sceneProgress(0, 0).travel)).toBe(true);
  });
});