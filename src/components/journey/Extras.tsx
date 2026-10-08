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
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold, rootMargin: "0px 0px -5% 0px" });
    io.observe(el);
    // Safety net: never leave content invisible if the observer misfires.
    const fallback = setTimeout(() => setInView(true), 1600);
    return () => { io.disconnect(); clearTimeout(fallback); };
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
  { icon: Clock, t: "Someone asks about an appointment", d: "If nobody replies quickly, they book somewhere else.", c: "the patient you already paid to attract." },
  { icon: PhoneMissed, t: "A patient calls at a busy moment", d: "A missed call can mean a missed appointment.", c: "most callers don't leave a voicemail; they call the next clinic." },
  { icon: StarOff, t: "A patient has a great visit", d: "Without a nudge, few leave a review.", c: "new patients choose the clinic with more recent reviews." },
  { icon: CalendarX, t: "Time passes", d: "Past patients drift away unless someone invites them back.", c: "your easiest bookings, from people who already trust you." },
  { icon: BellOff, t: "No reviews coming in", d: "New patients check reviews before they choose.", c: "you lose patients before they ever contact you." },
  { icon: UserX, t: "Booked patients don't turn up", d: "An empty chair still costs you the time slot.", c: "lost revenue, and a slot another patient could have had." },
];

export function ProblemGrid() {
  return <section id="problem" className="sx sx-light" aria-labelledby="problem-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker"><i />Where patients slip away</span><h2 id="problem-title">Most clinics don't have an enquiry problem. They have a <em>follow-up problem.</em></h2></div>
      <Reveal as="ul" className="problem-grid-x">{problems.map(({ icon: I, t, d, c }, i) => <li key={t} style={{ ["--i" as string]: i }}><span className="pg-icon"><I size={24} strokeWidth={1.75} /></span><b>{t}</b><p>{d}</p><p className="pg-cost"><strong>What it costs:</strong> {c}</p></li>)}</Reveal>
    </div>
  </section>;
}

export const steps = [
  { t: "Get found", d: "We run adverts on Google and Facebook for the treatments you most want to grow, and make sure you show up when people nearby search.", p: ["Adverts built around your treatments and area", "Your Google profile set up to be found", "A simple page that makes booking easy", "An offer that gives people a reason to choose you"] },
  { t: "Reply to every enquiry", d: "Every enquiry gets a reply within minutes, by text or email, day or night, with a few simple questions to check it's the right fit.", p: ["Replies within minutes, around the clock", "A few questions about need and timing", "Every message in one inbox for your team", "Urgent or complex enquiries passed straight to your staff"] },
  { t: "Follow up until they book", d: "If someone goes quiet, they hear from you again over the next days, with an easy way to choose a time.", p: ["Several friendly follow-ups, not just one", "Times offered directly from your calendar", "The booking lands in your diary automatically", "Your team only steps in when needed"] },
  { t: "Recover missed calls", d: "When nobody can answer, the caller gets a text within a minute with a link to a short booking form.", p: ["Instant text after a missed call", "A link to book in under a minute", "The visit lands in your calendar", "Your team sees every recovered call"] },
  { t: "Help patients show up", d: "Booked isn't the finish line. Confirmations and reminders make sure the patient actually arrives.", p: ["A confirmation as soon as they book", "A reminder the day before", "A text on the morning of the visit", "An easy way to reschedule instead of not turning up"] },
  { t: "Turn visits into reviews", d: "After a good visit, patients get a short thank-you with one tap to leave a review. Unhappy patients reach you privately first.", p: ["A thank-you message after each visit", "One tap to leave a review", "Concerns come to you before they go public", "More recent reviews where new patients look"] },
  { t: "Bring past patients back", d: "We send friendly, relevant messages to patients you haven't seen in a while, like check-up reminders or seasonal offers.", p: ["Patients grouped by when they last visited", "Messages that suit their treatment", "Replies go straight into your inbox", "They book like any new patient"] },
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
      <div className="process-head sx-head"><span className="sx-kicker"><i />What ZAAD does for your practice</span><h2 id="modules-title">How we turn attention into <em>booked patients</em></h2><p>Seven steps, from the first search to a patient in your chair, and back again for their next visit.</p></div>
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
