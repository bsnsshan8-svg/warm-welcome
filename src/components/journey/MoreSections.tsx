import { useEffect, useState } from "react";
import { Apple, ArrowDown, ArrowUpRight, Check, DoorOpen, User, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CentredHero() {
  const [zaad, setZaad] = useState(false);
  useEffect(() => { const t = setTimeout(() => setZaad(true), 1500); return () => clearTimeout(t); }, []);
  return <section id="top" className="ch" aria-labelledby="hero-title">
    <div className="ch-inner">
      <span className="sx-kicker">Zero Apples A Day · For medical practices</span>
      <h1 id="hero-title">An apple a day keeps the doctor <em>away.</em></h1>
      <p className="ch-yellow">ZAAD does the opposite. It brings patients in.</p>
      <p className="ch-p">We help medical practices bring the right patients in, reply to every enquiry fast, and turn more enquiries into booked appointments, so your team can focus on care.</p>
      <div className="ch-actions">
        <Button asChild variant="unstyled" size="unstyled" className="journey-primary"><Link to="/book">Book a strategy call <ArrowUpRight size={18} /></Link></Button>
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

/** Animated flat-art scene for each specialty. Pure SVG + CSS, theme colours only. */
function SpecialtyArt({ i }: { i: number }) {
  const common = { viewBox: "0 0 320 240", className: "sp-art", "aria-hidden": true as const };
  switch (i) {
    case 0: // Chiropractors — spine segments aligning
      return <svg {...common}>
        <rect x="140" y="30" width="40" height="180" rx="20" className="sp-line-soft" />
        {[0, 1, 2, 3, 4].map(n => <rect key={n} x="128" y={42 + n * 34} width="64" height="22" rx="11" className="sp-bone" style={{ ["--i" as string]: n }} />)}
        <circle cx="240" cy="70" r="6" className="sp-dot sp-d1" /><circle cx="70" cy="170" r="5" className="sp-dot sp-d2" />
      </svg>;
    case 1: // Regenerative Medicine — cells renewing
      return <svg {...common}>
        <circle cx="160" cy="120" r="46" className="sp-cell sp-c1" />
        <circle cx="160" cy="120" r="20" className="sp-cell-core" />
        <circle cx="95" cy="70" r="18" className="sp-cell sp-c2" /><circle cx="230" cy="80" r="14" className="sp-cell sp-c3" />
        <circle cx="105" cy="180" r="12" className="sp-cell sp-c3" /><circle cx="225" cy="175" r="20" className="sp-cell sp-c2" />
        <circle cx="160" cy="120" r="60" className="sp-ring" />
      </svg>;
    case 2: // Physical Therapy — movement along a path
      return <svg {...common}>
        <path d="M40 190 C 110 90, 210 230, 280 110" fill="none" className="sp-path" />
        <circle r="10" className="sp-mover"><animateMotion dur="3.2s" repeatCount="indefinite" path="M40 190 C 110 90, 210 230, 280 110" /></circle>
        <circle cx="40" cy="190" r="7" className="sp-node" /><circle cx="280" cy="110" r="7" className="sp-node sp-node-g" />
        <path d="M150 60 l14 14 M164 60 l-14 14" className="sp-spark" />
      </svg>;
    case 3: // Dental — tooth with sparkle
      return <svg {...common}>
        <path d="M160 55 c-40 0-62 24-62 58 0 40 22 82 34 82 10 0 8-34 28-34 s18 34 28 34 c12 0 34-42 34-82 0-34-22-58-62-58z" className="sp-tooth" />
        <path d="M235 45 l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" className="sp-shine sp-s1" />
        <path d="M85 165 l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" className="sp-shine sp-s2" />
      </svg>;
    case 4: // Med Spas — lotus / glow
      return <svg {...common}>
        {[0, 1, 2, 3, 4].map(n => <ellipse key={n} cx="160" cy="150" rx="22" ry="62" className="sp-petal" style={{ ["--r" as string]: `${(n - 2) * 36}deg`, ["--i" as string]: n }} />)}
        <circle cx="160" cy="120" r="14" className="sp-cell-core" />
        <circle cx="70" cy="60" r="5" className="sp-dot sp-d1" /><circle cx="255" cy="70" r="6" className="sp-dot sp-d2" />
      </svg>;
    case 5: // Eye Clinics — eye with scan line
      return <svg {...common}>
        <path d="M45 120 C 95 60, 225 60, 275 120 C 225 180, 95 180, 45 120z" className="sp-eye" />
        <circle cx="160" cy="120" r="34" className="sp-iris" /><circle cx="160" cy="120" r="14" className="sp-pupil" />
        <line x1="45" y1="120" x2="275" y2="120" className="sp-scan" />
      </svg>;
    default: // Surgeons — steady pulse into a cross
      return <svg {...common}>
        <path d="M30 130 h70 l16-38 22 76 18-50 12 12 h122" fill="none" className="sp-pulse" />
        <circle cx="160" cy="70" r="30" className="sp-cross-bg" />
        <path d="M160 55 v30 M145 70 h30" className="sp-cross" />
      </svg>;
  }
}

export function SpecialtyPicker() {
  const [a, setA] = useState(0);
  return <section id="who" className="sx sx-light" aria-labelledby="who-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Who we help</span><h2 id="who-title">Built around how your practice <em>grows.</em></h2></div>
      <div className="sp-grid">
        <div>
          <div className="sp-pills">{specialties.map(([n], i) => <button type="button" key={n} className="sp-pill" aria-pressed={i === a} onClick={() => setA(i)}>{n}</button>)}</div>
          <p className="sp-text" aria-live="polite" key={a}>{specialties[a]![1]}</p>
        </div>
        <div className="sp-stage" key={a} aria-hidden="true">
          <span className="sp-stage-label">{specialties[a]![0]}</span>
          <SpecialtyArt i={a} />
        </div>
      </div>
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
  const booked = Math.round(enq * book / 100), shows = Math.round(booked * show / 100), value = shows * val;
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
          <div><span>Booked patients</span><b>{booked}</b></div>
          <div><span>Patients who show up</span><b>{shows}</b></div>
          <div className="es-big"><span>Monthly value</span><b>{money(value)}</b></div>
          <small>Illustrative only, based on your inputs. Excludes ad spend, running costs, cancellations and refunds.</small>
        </div>
      </div>
      <BookPrompt text="Want help turning these numbers into patients?" />
    </div>
  </section>;
}

export function BookPrompt({ text }: { text: string }) {
  return <div className="book-prompt"><p>{text}</p><Button asChild variant="unstyled" size="unstyled" className="journey-primary"><Link to="/book">Book a strategy call <ArrowUpRight size={18} /></Link></Button></div>;
}

export function Pricing() {
  const plans = [
    { n: "The core systems", p: "$297", s: "/month", d: "Fast replies, follow-up, missed-call text-back, review invitations and past-patient messages, with monthly upkeep and support.", dark: false },
    { n: "Done for you: Accelerator", p: "$1,497", s: "/month + ad spend", d: "We run your adverts, booking page, replies, follow-up and scheduling for you. Recommended ad spend $30 to $50 a day.", dark: true },
    { n: "Done for you: Power", p: "$2,200", s: "/month + ad spend", d: "Everything in Accelerator on both Facebook and Google, for practices ready for more patients. Recommended ad spend up to $100 a day.", dark: false },
  ];
  return <>
  <section id="pricing" className="sx sx-light" aria-labelledby="pr-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Pricing</span><h2 id="pr-title">Simple. <em>No surprises.</em></h2></div>
      <div className="pr-grid">{plans.map(pl => <div key={pl.n} className={`pr-card ${pl.dark ? "pr-dark" : ""}`}>{pl.dark && <span className="pr-tag">Most chosen</span>}<h3>{pl.n}</h3><p className="pr-price"><b>{pl.p}</b><span>{pl.s}</span></p><p>{pl.d}</p><Button asChild variant="unstyled" size="unstyled" className="journey-primary pr-cta"><Link to="/book">Get started <ArrowUpRight size={18} /></Link></Button></div>)}</div>
      <div className="pr-card pr-setup"><h3>One-time setup: $997.</h3><p>Onboarding, your treatments and prices, booking page, tracking, scheduling and launch.</p></div>
    </div>
  </section>
  <section className="guarantee-band" aria-labelledby="gb-title">
    <div className="sx-shell">
      <h2 id="gb-title">30-day money-back guarantee.</h2>
      <p>If we don't deliver on the targets we agree with you, you get your money back.</p>
      <p>Want to see the opportunity first? <Link to="/book">Book a free strategy call</Link> and we'll show you where patients are slipping away.</p>
    </div>
  </section>
  </>;
}

export function FitCheck() {
  return <section id="fit" className="sx sx-light sx-mist" aria-labelledby="fit-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Fit check</span><h2 id="fit-title">Is ZAAD <em>a fit?</em></h2></div>
      <div className="fit-grid">
        <div className="pr-card fit-yes"><h3><Check size={22} aria-hidden="true" /> Good fit</h3><p>You have room for more patients, you offer a high-value service, your team can handle new appointments, and you want something that keeps improving month after month.</p></div>
        <div className="pr-card fit-no"><h3><X size={22} aria-hidden="true" /> Not a fit</h3><p>You only want the cheapest possible enquiries, you're not willing to change how enquiries are handled, or you expect marketing to fix a clinical or staffing problem by itself.</p></div>
      </div>
    </div>
  </section>;
}
