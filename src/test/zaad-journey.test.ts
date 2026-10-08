import { describe, expect, it } from "vitest";
import { chapters, sceneProgress } from "@/lib/zaad-journey";

describe("ZAAD scroll journey", () => {
  it("describes missed calls as patient booking through a text link", () => {
    const missed = chapters.find(chapter => chapter.id === "recover");
    expect(missed?.text).toContain("a text with a link to book");
    expect(missed?.points).toContain("The text links to a short booking form");
    expect(missed?.points).toContain("They pick a time and they're booked");
  });
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