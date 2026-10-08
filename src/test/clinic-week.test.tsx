import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ClinicWeek } from "@/components/journey/ClinicWeek";

vi.mock("@tanstack/react-router", () => ({ Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a> }));
let intersect: IntersectionObserverCallback;
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback; }
    observe() {}
    disconnect() {}
  });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
const enter = () => act(() => intersect([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));

describe("Clinic week", () => {
  it("defaults to Without, previews With after first entry and allows manual return", () => {
    render(<ClinicWeek />);
    expect(screen.getByRole("button", { name: "WITHOUT ZAAD" })).toHaveAttribute("aria-pressed", "true");
    enter();
    act(() => vi.advanceTimersByTime(2499));
    expect(screen.getByRole("button", { name: "WITH ZAAD" })).toHaveAttribute("aria-pressed", "false");
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("button", { name: "WITH ZAAD" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "WITHOUT ZAAD" }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("button", { name: "WITHOUT ZAAD" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "BOOK A STRATEGY CALL" })).toHaveAttribute("href", "/book");
  });
  it("does not override a visitor's choice during the preview delay", () => {
    render(<ClinicWeek />); enter();
    fireEvent.click(screen.getByRole("button", { name: "WITHOUT ZAAD" }));
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByRole("button", { name: "WITHOUT ZAAD" })).toHaveAttribute("aria-pressed", "true");
  });
});