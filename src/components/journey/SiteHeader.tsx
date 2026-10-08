import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";

const links = [["Who we help", "who"], ["How it works", "modules"], ["UniBox", "unibox"], ["Pricing", "pricing"], ["FAQ", "faq"]] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const body = document.body;
    const original = { position: body.style.position, top: body.style.top, width: body.style.width };
    const main = document.querySelector("main");
    const wasInert = main?.inert ?? false;
    if (main) main.inert = true;
    body.style.position = "fixed"; body.style.top = `${-y}px`; body.style.width = "100%";
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
      if (e.key !== "Tab") return;
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("a[href],button") ?? []);
      const first = items[0], last = items.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    const resize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("keydown", key); window.addEventListener("resize", resize);
    return () => {
      if (main) main.inert = wasInert;
      Object.assign(body.style, original);
      window.scrollTo({ top: y, behavior: "instant" });
      triggerRef.current?.focus({ preventScroll: true });
      window.removeEventListener("keydown", key); window.removeEventListener("resize", resize);
    };
  }, [open]);
  const follow = (id: string) => {
    setOpen(false);
    window.setTimeout(() => {
      history.pushState(null, "", `#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }, 0);
  };
  return <>
    <header className="journey-header zaad-header">
      <a href="#top" aria-label="ZAAD home" className="journey-logo"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day" /></a>
      <nav aria-label="Main navigation">{links.slice(0, 4).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <Button asChild variant="unstyled" size="unstyled" className="journey-call"><Link to="/book">Book a strategy call <ArrowUpRight size={18} /></Link></Button>
      <Button ref={triggerRef} variant="unstyled" size="unstyled" className="journey-menu" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu size={22} /></Button>
    </header>
    {open && createPortal(<div id="mobile-menu" className="zaad-mobile-menu" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Main navigation">
      <div className="mobile-menu-top"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day" /><Button variant="unstyled" size="unstyled" className="mobile-menu-close" aria-label="Close menu" onClick={() => setOpen(false)}><X size={28} /></Button></div>
      <nav aria-label="Mobile navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); follow(id); }}>{label}</a>)}<Button asChild variant="unstyled" size="unstyled" className="journey-primary"><Link to="/book" onClick={() => setOpen(false)}>Book a strategy call <ArrowUpRight size={18} /></Link></Button></nav>
    </div>, document.body)}
  </>;
}
