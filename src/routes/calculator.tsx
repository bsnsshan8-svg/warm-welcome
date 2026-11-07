import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";
import { bigNumber, computeLeak, defaultInputs, usd, type LeakInputs, type LeakResult } from "@/lib/clinic-leak";

const title = "Clinic Audit and Leak Calculator — ZAAD";
const desc = "See what missed calls, unanswered messages and lost past patients cost your clinic each month. Two minutes, your own numbers.";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zeroapplesaday.com/calculator" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zeroapplesaday.com/calculator" }],
  }),
  component: CalculatorPage,
});

type Lead = { name: string; clinic: string; phone: string; email: string; consent: true };

/** Lead hand-off point. Currently logs only; connect a database here later. */
function saveLead(lead: Lead, inputs: LeakInputs, result: LeakResult) {
  console.log("[ZAAD lead]", { lead, inputs, result });
}

const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  clinic: z.string().trim().min(1, "Please enter your clinic name").max(150),
  phone: z.string().trim().max(30).refine(v => /^\+?[\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15, "Please enter a valid mobile number"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  consent: z.literal(true, { errorMap: () => ({ message: "Please tick the box to continue" }) }),
});

type NumField = { id: Exclude<keyof LeakInputs, "web">; label: string; hint?: string; slider?: number; step?: number };
const fields: NumField[] = [
  { id: "missed", label: "Calls missed per week", hint: "Count them in your phone's call log for a normal week. Include calls missed while staff were busy, when nobody was there, and after hours." },
  { id: "convS", label: "Of the calls you do answer, how many become a new-patient booking?", slider: 100, hint: "For every 10 calls you answer, how many end with a new patient booked? We assume missed callers are similar." },
  { id: "recS", label: "Of new-patient voicemails you return, how many still book?", slider: 100 },
  { id: "msgs", label: "Messages you could not answer in time, per month, across email, text, social media and website forms" },
  { id: "past", label: "Patients who have not visited in over a year, but did in the last 3 years", step: 10 },
  { id: "retS", label: "How many might return for a good offer?", slider: 30 },
  { id: "rev", label: "Your Google reviews" },
  { id: "comp", label: "Reviews at the top-reviewed clinic near you" },
];

const covers = [
  ["A review of your own numbers: calls, messages, reviews and past patients", "$47 value"],
  ["Every leak we find in how patients reach your clinic, biggest first", "$60 value"],
  ["How to fix each one, in an order that suits a busy clinic", "$60 value"],
  ["How we can set it all up for you, if you want that, and what it costs", "$30 value"],
];
const worksIf = ["You have never run an ad", "Your front desk is busy all day", "You don't use any special software", "You only have 30 minutes this week", "You're not sure how many calls you miss"];
const faqs = [
  ["Is the calculator free?", "Yes. We ask for your contact details so we can send your result and follow up about it."],
  ["What happens on the 30-minute call?", "We go through your numbers, show you where patients slip away, explain how to fix each leak, and show how we can set it up for you if you want that. You can say no to that part."],
  ["Who is the call with?", "Someone from the ZAAD team, one to one. It is not a group webinar."],
  ["What do I need to prepare?", "Your phone's call log, your patient software and your Google listing."],
  ["Is this only for chiropractors?", "No. Any clinic that takes calls and books appointments can use it."],
  ["Is it a subscription?", "No. It is one payment of $17."],
  ["What if the call isn't useful?", "Reply to your receipt email within 30 days and we'll refund your $17."],
  ["What if I can't make my time?", "You can pick another time from your confirmation email."],
];

function CalculatorPage() {
  const [raw, setRaw] = useState<Record<string, string>>(() => Object.fromEntries(Object.entries(defaultInputs).map(([k, v]) => [k, String(v)])));
  const inputs = useMemo<LeakInputs>(() => {
    const o = { ...defaultInputs } as LeakInputs;
    for (const f of fields) o[f.id] = Number(raw[f.id]) || 0;
    o.web = raw.web === "yes" ? "yes" : "no";
    o.val = Number(raw.val) || 0;
    return o;
  }, [raw]);
  const r = useMemo(() => computeLeak(inputs), [inputs]);
  const set = (k: string, v: string) => setRaw(p => ({ ...p, [k]: v }));

  const [lead, setLead] = useState({ name: "", clinic: "", phone: "", email: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      document.getElementById(`lead-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setErrors({});
    saveLead(parsed.data as Lead, inputs, r);
    setUnlocked(true);
  };

  const gap = r.reviewGap;
  return <main className="journey-page calc-page">
    <header className="journey-header">
      <Link to="/" aria-label="ZAAD home" className="journey-logo"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day" /></Link>
      <span />
      <Button asChild variant="unstyled" size="unstyled" className="journey-call"><Link to="/"><ArrowLeft size={18} /> Home</Link></Button>
    </header>

    <section className="calc-hero" aria-labelledby="calc-title">
      <div className="calc-shell">
        <span className="calc-pill">For medical practices · Clinic Audit</span>
        <h1 id="calc-title">See what your clinic's leaks cost you each month.</h1>
        <p className="calc-strip">Two minutes. Your own numbers.</p>
        <p className="calc-lead">Most clinics don't need more marketing. They need every call and message answered and followed up. Answer a few questions and see where patients slip away.</p>
        <ul className="calc-ticks">{["Takes about 2 minutes", "Free to try", "Built from your own numbers"].map(t => <li key={t}><Check size={18} aria-hidden="true" />{t}</li>)}</ul>
      </div>
    </section>

    <section className="calc-main" aria-label="Leak calculator">
      <div className="calc-shell calc-grid">
        <div className="calc-card">
          <h2>Your clinic's numbers</h2>
          <div className="calc-prep"><b>Have these open first (about 2 minutes):</b> your phone's call log for a normal week; your email and social inbox for the last 30 days; your patient software's inactive-patients report; Google Maps searching your clinic and area. Don't have them handy? A best guess is fine.</div>
          <p className="calc-tag">Example numbers shown. Replace them with yours.</p>
          {fields.map(f => <div key={f.id} className="calc-field">
            <label htmlFor={`in-${f.id}`}>{f.label}{f.slider !== undefined && <output htmlFor={`in-${f.id}`}>{raw[f.id]}%</output>}</label>
            {f.hint && <p className="calc-hint" id={`hint-${f.id}`}>{f.hint}</p>}
            {f.slider !== undefined
              ? <input id={`in-${f.id}`} type="range" min={0} max={f.slider} value={raw[f.id]} aria-describedby={f.hint ? `hint-${f.id}` : undefined} onChange={e => set(f.id, e.target.value)} />
              : <input id={`in-${f.id}`} type="number" inputMode="numeric" min={0} step={f.step ?? 1} value={raw[f.id]} aria-describedby={f.hint ? `hint-${f.id}` : undefined} onChange={e => set(f.id, e.target.value)} />}
          </div>)}
          <div className="calc-field">
            <label htmlFor="in-web">Can a new patient book online at 11 pm?</label>
            <select id="in-web" value={raw.web} onChange={e => set("web", e.target.value)}><option value="no">No</option><option value="yes">Yes</option></select>
          </div>
          <div className="calc-field">
            <label htmlFor="in-val">What a typical new patient pays you, in dollars</label>
            <p className="calc-hint" id="hint-val">From the first visit to the end of their care. If you aren't sure, use a cautious number, because every result above is built on it.</p>
            <input id="in-val" type="number" inputMode="numeric" min={0} step={50} value={raw.val} aria-describedby="hint-val" onChange={e => set("val", e.target.value)} />
          </div>
        </div>

        <div className="calc-result" aria-live="polite">
          {!unlocked ? <form onSubmit={submit} noValidate className="calc-gate">
            <h2>Your estimate is ready.</h2>
            <p>Tell us where to send it. We will email your result, and we may call to talk it through.</p>
            {([["name", "Your name", "text", "name"], ["clinic", "Clinic name", "text", "organization"], ["phone", "Mobile phone", "tel", "tel"], ["email", "Email", "email", "email"]] as const).map(([k, l, t, ac]) => <div key={k} className="calc-field">
              <label htmlFor={`lead-${k}`}>{l}</label>
              <input id={`lead-${k}`} type={t} autoComplete={ac} required aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `err-${k}` : undefined} value={lead[k]} onChange={e => setLead(p => ({ ...p, [k]: e.target.value }))} />
              {errors[k] && <p className="calc-err" id={`err-${k}`}>{errors[k]}</p>}
            </div>)}
            <label className="calc-consent">
              <input id="lead-consent" type="checkbox" required checked={lead.consent} aria-invalid={!!errors.consent} onChange={e => setLead(p => ({ ...p, consent: e.target.checked }))} />
              <span>I agree that ZAAD may call, text or email me about my result and the clinic audit. Message and data rates may apply. Reply STOP to opt out of texts.</span>
            </label>
            {errors.consent && <p className="calc-err">{errors.consent}</p>}
            <Button type="submit" variant="unstyled" size="unstyled" className="journey-primary calc-btn">Show my result <ArrowRight size={18} /></Button>
          </form> : <div className="calc-out">
            <p className="calc-out-label">Estimated value slipping away each month</p>
            <p className="calc-big">{bigNumber(r)}</p>
            <p className="calc-range">About {r.pLow.toFixed(1)} to {r.pHigh.toFixed(1)} patients a month. The low end assumes 20 more points of callers wait for your call back.</p>
            <dl className="calc-break">
              <div><dt>Calls missed</dt><dd>{usd(r.callsValue)}/month</dd><small>Missed-call text-back, website and chat</small></div>
              <div><dt>Messages not answered in time</dt><dd>{usd(r.msgsValue)}/month</dd><small>One inbox and follow-up</small></div>
              <div><dt>Past patients who might return</dt><dd>{usd(r.pastValue)} once</dd><small>Past-patient campaigns. A one-time amount, not added to the monthly figure.</small></div>
              <div><dt>Google reviews</dt><dd>{gap > 0 ? `${gap} behind` : gap < 0 ? `${-gap} ahead` : "Level"}</dd><small>Review funnel. A comparison with the top-reviewed clinic near you, not a dollar figure.</small></div>
              <div><dt>Booking online at night</dt><dd>{r.webAvailable ? "Available" : "Not available"}</dd><small>Website and chat. {r.webAvailable ? "Check that it works on a phone." : "A visitor at 11 pm has nowhere to book."}</small></div>
            </dl>
            <p className="calc-start">{r.largest ? <>Start with: <b>{r.largest}</b>. It is the largest monthly leak in your numbers.</> : "Enter your numbers to see which leak is largest."}</p>
            <Button asChild variant="unstyled" size="unstyled" className="journey-primary calc-btn"><Link to="/book">Book your 30-minute audit, $17 <ArrowRight size={18} /></Link></Button>
            <p className="calc-disc">A planning tool, not a forecast or a promise. It excludes ad spend, running costs and cancellations, and it counts only what you entered.</p>
          </div>}
        </div>
      </div>
    </section>

    <section className="calc-offer" aria-labelledby="offer-title">
      <div className="calc-shell calc-offer-grid">
        <div>
          <h2 id="offer-title">See where patients slip away, and how to fix it.</h2>
          <p>The calculator shows the size of the problem. In a 30-minute one-to-one call, we look at your clinic and show you what is causing it and what to do about it.</p>
          <h3>What the call covers</h3>
          <ul className="calc-list">{covers.map(([t, v]) => <li key={t}><Check size={18} aria-hidden="true" /><span>{t} <em>({v})</em></span></li>)}</ul>
          <h3>Works even if…</h3>
          <ul className="calc-list">{worksIf.map(t => <li key={t}><Check size={18} aria-hidden="true" /><span>{t}</span></li>)}</ul>
          <div className="calc-why"><h3>Why only $17?</h3><p>A small price keeps the call open to any clinic and means we both turn up prepared. The price goes up to $47 after launch. If you want help setting things up, we will show you how on the call. There is no obligation.</p></div>
        </div>
        <div className="calc-buy">
          <p className="calc-was">Total value <s>$197</s></p>
          <p className="calc-price">$17</p>
          <p className="calc-tag">Launch price. Goes up to $47.</p>
          <Button asChild variant="unstyled" size="unstyled" className="journey-primary calc-btn"><Link to="/book">Book my audit <ArrowRight size={18} /></Link></Button>
          <p className="calc-small">One payment. Pick your time right after.</p>
          <p className="calc-small">30-day guarantee. If the call doesn't show you something useful about your clinic, reply to your receipt email within 30 days and we'll refund your $17.</p>
        </div>
      </div>
    </section>

    <section className="calc-faq" aria-labelledby="faq-title">
      <div className="calc-shell">
        <h2 id="faq-title">Questions</h2>
        <Accordion type="single" collapsible>{faqs.map(([q, a], i) => <AccordionItem key={q} value={`f${i}`}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion>
      </div>
    </section>

    <footer className="calc-footer">
      <div className="calc-shell">
        <p>We use your details to send your result and to contact you about it. The figures above are estimates based on your own inputs and are not a guarantee of results. This page does not give medical, legal or financial advice.</p>
        <p>ZAAD · 1001 S Main St, Ste 500, Kalispell MT 59901, US · All prices are in US dollars.</p>
      </div>
    </footer>
  </main>;
}
