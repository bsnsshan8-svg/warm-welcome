import { useEffect, useState } from "react";
import { Apple, ArrowDown, ArrowUpRight, Check, DoorOpen, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CentredHero() {
  const [zaad, setZaad] = useState(false);
  useEffect(() => { const t = setTimeout(() => setZaad(true), 1500); return () => clearTimeout(t); }, []);
  return <section id="top" className="ch" aria-labelledby="hero-title">
    <div className="ch-inner">
      <span className="sx-kicker">Zero Apples A Day · For medical practices</span>
      <h1 id="hero-title">An apple a day keeps the doctor <em>away.</em></h1>
      <p className="ch-yellow">ZAAD does the opposite. It brings patients in.</p>
      <p className="ch-p">ZAAD brings new patients to your practice, replies to every enquiry, books the appointment, and brings past patients back, so your team can focus on care.</p>
      <div className="ch-actions">
        <Button asChild variant="unstyled" size="unstyled" className="journey-primary"><a href="#contact">Book a strategy call <ArrowUpRight size={18} /></a></Button>
        <Button asChild variant="unstyled" size="unstyled" className="journey-text-link"><a href="#system">See how it works <ArrowDown size={18} /></a></Button>
      </div>
    </div>
    <div className="ch-card" data-zaad={zaad}>
      <div className="ch-half ch-apple"><Apple size={36} aria-hidden="true" /><b>An apple a day</b><span>keeps patients away</span></div>
      <button type="button" className="ch-switch" role="switch" aria-checked={zaad} aria-label="Switch between an apple a day and zero apples a day" onClick={() => setZaad(z => !z)}><i /></button>
      <div className="ch-half ch-zaad"><b>Zero Apples A Day</b><span>brings patients in</span>
        <div className="ch-walk" aria-hidden="true">{[0, 1, 2].map(i => <span key={i} className="ch-av" style={{ ["--i" as string]: i }}><User size={16} /></span>)}<span className="ch-door"><DoorOpen size={22} /></span></div>
      </div>
    </div>
  </section>;
}

const specialties: [string, string][] = [
  ["Chiropractors", "We help new patients in your area find you and book their first adjustment, then keep them coming back for their care plan."],
  ["Regenerative Medicine", "We explain your treatments in plain words, answer early questions quickly, and guide interested patients to a consultation."],
  ["Physical Therapy", "We help people with pain or injuries find your clinic, book an assessment, and stay on track with their sessions."],
  ["Dental Clinics", "We bring in local patients looking for a dentist, reply to every enquiry, and remind past patients when their check-up is due."],
  ["Med Spas", "We help people discover your treatments, answer their questions, and book them in, then invite them back for their next visit."],
  ["Eye Clinics", "We help people looking for eye care find you, book an exam, and come back when it's time for their next check."],
  ["Surgeons", "We help patients researching a procedure reach you, get their questions answered, and book a consultation with your team."],
];

export function SpecialtyPicker() {
  const [a, setA] = useState(0);
  return <section id="who" className="sx sx-light" aria-labelledby="who-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Who we help</span><h2 id="who-title">Built around how your practice <em>grows.</em></h2></div>
      <div className="sp-pills">{specialties.map(([n], i) => <button type="button" key={n} className="sp-pill" aria-pressed={i === a} onClick={() => setA(i)}>{n}</button>)}</div>
      <p className="sp-text" aria-live="polite" key={a}>{specialties[a]![1]}</p>
    </div>
  </section>;
}

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
function Slider({ label, min, max, step, value, onChange, fmt }: { label: string; min: number; max: number; step: number; value: number; onChange: (n: number) => void; fmt: (n: number) => string }) {
  return <label className="es-slider"><span><b>{label}</b><output>{fmt(value)}</output></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} /></label>;
}

export function GrowthEstimator() {
  const [enq, setEnq] = useState(40), [book, setBook] = useState(35), [show, setShow] = useState(80), [val, setVal] = useState(1500);
  const booked = enq * book / 100, shows = booked * show / 100, value = shows * val;
  const pct = (n: number) => `${n}%`;
  return <section id="estimator" className="sx sx-light sx-mist" aria-labelledby="es-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Practice growth estimator</span><h2 id="es-title">See where small gaps become <em>big numbers.</em></h2><p>Move the sliders to match your practice. This is a planning tool, not a forecast or a promise.</p></div>
      <div className="es-grid">
        <div className="es-card">
          <Slider label="Enquiries per month" min={10} max={200} step={1} value={enq} onChange={setEnq} fmt={String} />
          <Slider label="Enquiries that book" min={5} max={90} step={1} value={book} onChange={setBook} fmt={pct} />
          <Slider label="Booked patients who show up" min={30} max={100} step={1} value={show} onChange={setShow} fmt={pct} />
          <Slider label="Average value per patient" min={100} max={5000} step={50} value={val} onChange={setVal} fmt={money} />
        </div>
        <div className="es-out" aria-live="polite">
          <div><span>Booked patients</span><b>{booked.toFixed(1)}</b></div>
          <div><span>Patients who show up</span><b>{shows.toFixed(1)}</b></div>
          <div className="es-big"><span>Monthly value</span><b>{money(value)}</b></div>
          <small>Illustrative only, based on your inputs. Excludes ad spend, running costs, cancellations and refunds.</small>
        </div>
      </div>
    </div>
  </section>;
}

export function Pricing() {
  const plans = [
    { n: "The core systems", p: "$297", s: "/month", d: "", dark: false },
    { n: "Done for you: Accelerator", p: "$1,497", s: "/month + ad spend", d: "Recommended ad spend $30 to $50 a day.", dark: true },
    { n: "Done for you: Power", p: "$2,200", s: "/month + ad spend", d: "Recommended ad spend up to $100 a day.", dark: false },
  ];
  return <section id="pricing" className="sx sx-light" aria-labelledby="pr-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Pricing</span><h2 id="pr-title">Simple. <em>No surprises.</em></h2></div>
      <div className="pr-grid">{plans.map(pl => <div key={pl.n} className={`pr-card ${pl.dark ? "pr-dark" : ""}`}><h3>{pl.n}</h3><p className="pr-price"><b>{pl.p}</b><span>{pl.s}</span></p>{pl.d && <p>{pl.d}</p>}</div>)}</div>
      <div className="pr-extra"><div className="pr-card"><h3>One-time setup: $997</h3></div><div className="pr-card pr-yellow"><h3>30-day money-back guarantee.</h3><p>If we don't deliver on the targets we agree with you, you get your money back.</p></div></div>
    </div>
  </section>;
}

export function FitCheck() {
  return <section id="fit" className="sx sx-light sx-mist" aria-labelledby="fit-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Fit check</span><h2 id="fit-title">Is ZAAD <em>a fit?</em></h2></div>
      <div className="fit-grid">
        <div className="pr-card fit-yes"><h3><Check size={22} aria-hidden="true" /> Good fit</h3><p>You have room for more patients, your team can handle new appointments, and you want something that keeps working month after month.</p></div>
        <div className="pr-card fit-no"><h3><X size={22} aria-hidden="true" /> Not a fit</h3><p>You only want the cheapest possible enquiries, or you expect marketing to fix a clinical or staffing problem by itself.</p></div>
      </div>
    </div>
  </section>;
}
