import { useEffect, useRef, useState, type ReactNode } from "react";
import { BellOff, CalendarX, Check, Clock, MessageSquare, PhoneMissed, StarOff, UserX } from "lucide-react";

/** Adds data-inview="true" once the element scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export function Reveal({ children, className = "", as: Tag = "div", ...rest }: { children: ReactNode; className?: string; as?: "div" | "ol" | "ul"; [k: string]: unknown }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const T = Tag as "div";
  return <T ref={ref} className={`reveal ${className}`} data-inview={inView} {...rest}>{children}</T>;
}

export function CountUp({ value, prefix = "", suffix = "", decimals = 0, start }: { value: number; prefix?: string; suffix?: string; decimals?: number; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(value); return; }
    let raf = 0; const t0 = performance.now(); const dur = 1400;
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / dur); setN(value * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);
  return <span className="count">{prefix}{n.toFixed(decimals)}{suffix}</span>;
}

/* PLACEHOLDER FIGURES: replace with your real numbers. Shared by the results strip and the stats band. */
export const results = [
  { value: 120, prefix: "", suffix: "+", decimals: 0, label: "new patient enquiries per month", snippet: "New enquiry: “Do you have anything this week?”" },
  { value: 18, prefix: "£", suffix: "", decimals: 0, label: "average cost per enquiry", snippet: "Ad → enquiry, tracked automatically" },
  { value: 35, prefix: "", suffix: "%", decimals: 0, label: "more booked appointments", snippet: "✓ Check-up booked, Monday 9:00 AM" },
  { value: 2, prefix: "", suffix: " min", decimals: 0, label: "average reply time", snippet: "Replied in 2 minutes" },
];

export function ResultsStrip() {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  return <section ref={ref} id="results" className="sx sx-light results" aria-labelledby="results-title">
    <div className="sx-shell">
      <h2 id="results-title" className="results-title">Results from real practices</h2>
      <div className="results-grid">{results.map(r => <article key={r.label} className="result-card">
        <b className="result-num"><CountUp start={inView} {...r} /></b>
        <span className="result-label">{r.label}</span>
        <span className="result-snippet"><MessageSquare size={14} />{r.snippet}</span>
      </article>)}</div>
      <p className="results-note">Example figures shown. Replace with your own results.</p>
    </div>
  </section>;
}

export function StatsBand() {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  return <section ref={ref} className="stats-band" aria-label="Results">
    <div className="sx-shell stats-grid">{results.map(r => <div key={r.label} className="stat-tile"><b><CountUp start={inView} {...r} /></b><span>{r.label}</span></div>)}</div>
  </section>;
}

const problems = [
  { icon: Clock, t: "Someone asks about an appointment", d: "If nobody replies quickly, they book somewhere else." },
  { icon: PhoneMissed, t: "A patient calls", d: "A missed call can mean a missed appointment." },
  { icon: StarOff, t: "A patient has a great visit", d: "Without a nudge, few leave a review." },
  { icon: CalendarX, t: "Time passes", d: "Past patients drift away unless someone invites them back." },
  { icon: BellOff, t: "No reviews coming in", d: "New patients check reviews before they choose a clinic." },
  { icon: UserX, t: "Past patients never hear from you", d: "Patients you've treated before end up at another practice." },
];

export function ProblemGrid() {
  return <section id="problem" className="sx sx-dark" aria-labelledby="problem-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker"><i />Where patients slip away</span><h2 id="problem-title">Most clinics don't have an enquiry problem. They have a <em>follow-up problem.</em></h2></div>
      <Reveal as="ul" className="problem-grid-x">{problems.map(({ icon: I, t, d }, i) => <li key={t} style={{ ["--i" as string]: i }}><span className="pg-icon"><I size={24} strokeWidth={1.75} /></span><b>{t}</b><p>{d}</p></li>)}</Reveal>
    </div>
  </section>;
}

export const steps = [
  { t: "Get found", d: "People searching for a clinic like yours find you, and get in touch.", p: ["Show up when locals look for care nearby", "A clear page that makes booking easy", "Offers that give people a reason to visit", "More new patients asking to book"] },
  { t: "Reply to every enquiry", d: "Every patient enquiry gets a quick reply, day or night.", p: ["A reply within moments, day or night", "The right questions before booking", "Every patient message in one inbox", "One clear next step"] },
  { t: "Follow up until they book", d: "Friendly follow-up and an easy way to book, until the visit is in your calendar.", p: ["Friendly follow-up if they go quiet", "An easy way to book", "The appointment booked in your calendar", "A reminder so they turn up"] },
  { t: "Recover missed calls", d: "When nobody can answer, the caller gets a text back and a way to book.", p: ["Know straight away when a call is missed", "A text goes back to the caller", "The conversation picks up where it stopped", "The appointment gets booked"] },
  { t: "Turn visits into reviews", d: "After a good visit, patients are invited to share it, so new patients see the care you give.", p: ["Ask patients how their visit went", "Invite happy patients to leave a review", "More reviews where new patients look", "The relationship continues after the appointment"] },
  { t: "Bring past patients back", d: "Your past patients already trust you. Invite them back with a friendly message.", p: ["Reach patients you haven't seen in a while", "Send a friendly, relevant invitation", "They reply and book a visit", "Patients you've treated before hear from you"] },
];

export function ProcessSteps() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current; if (!list) return;
      const mark = window.innerHeight * 0.55;
      const r = list.getBoundingClientRect();
      setFill(Math.max(0, Math.min(1, (mark - r.top) / Math.max(1, r.height))));
      let a = 0;
      list.querySelectorAll("li").forEach((li, i) => { if (li.getBoundingClientRect().top < mark) a = i; });
      setActive(a);
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", req, { passive: true }); window.addEventListener("resize", req);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", req); window.removeEventListener("resize", req); };
  }, []);
  return <section id="modules" className="sx sx-light process" aria-labelledby="modules-title">
    <div className="sx-shell process-grid">
      <div className="process-head sx-head"><span className="sx-kicker"><i />What ZAAD does for your practice</span><h2 id="modules-title">How we turn attention into <em>booked patients</em></h2><p>Six steps, from the first search to a patient in your chair, and back again for their next visit.</p></div>
      <div className="process-track">
        <span className="process-line" aria-hidden="true"><i style={{ transform: `scaleY(${fill})` }} /></span>
        <ol ref={listRef} className="process-list">{steps.map((s, i) => <li key={s.t} className="process-card" data-active={i === active}>
          <span className="step-badge">Step {String(i + 1).padStart(2, "0")}</span>
          <h3>{s.t}</h3><p>{s.d}</p>
          <ul>{s.p.map(x => <li key={x}><Check size={18} />{x}</li>)}</ul>
        </li>)}</ol>
      </div>
    </div>
  </section>;
}
