import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { submitLead, type LeadPayloadInput } from "@/lib/submit-lead";
import { bigNumber, computeLeak, defaultInputs, usd, type LeakInputs, type LeakResult } from "@/lib/clinic-leak";

type Lead = { name: string; clinic: string; phone: string; email: string; consent: true };

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type Utm = Record<(typeof UTM_KEYS)[number], string>;

function readUtm(): Utm {
  const q = new URLSearchParams(window.location.search);
  let stored: Partial<Utm> = {};
  try { stored = JSON.parse(sessionStorage.getItem("zaad_utm") || "{}"); } catch { /* ignore */ }
  const utm = Object.fromEntries(UTM_KEYS.map(k => [k, q.get(k) ?? stored[k] ?? ""])) as Utm;
  try { sessionStorage.setItem("zaad_utm", JSON.stringify(utm)); } catch { /* ignore */ }
  return utm;
}

/** Sends the lead to GoHighLevel via the server. Never surfaces errors to the visitor. */
async function saveLead(lead: Lead, inputs: LeakInputs, result: LeakResult, utm: Utm) {
  const payload: LeadPayloadInput = {
    name: lead.name, clinic: lead.clinic, phone: lead.phone, email: lead.email,
    page_url: window.location.href, ...utm,
    calls_missed_per_week: inputs.missed, conv_pct: inputs.convS, voicemail_recovery_pct: inputs.recS,
    messages_per_month: inputs.msgs, past_patients: inputs.past, return_pct: inputs.retS,
    google_reviews: inputs.rev, competitor_reviews: inputs.comp, online_booking_at_night: inputs.web, patient_value: inputs.val,
    leak_low_usd: Math.round(result.dLow), leak_high_usd: Math.round(result.dHigh),
    patients_low: Math.round(result.pLow * 10) / 10, patients_high: Math.round(result.pHigh * 10) / 10,
    calls_value_usd_month: Math.round(result.callsValue), messages_value_usd_month: Math.round(result.msgsValue),
    past_patients_value_usd_once: Math.round(result.pastValue), review_gap: result.reviewGap, largest_leak: result.largest ?? "",
  };
  for (let attempt = 0; attempt < 2; attempt++) {
    try { const res = await submitLead({ data: payload }); if (res.ok) return; } catch { /* retry */ }
    if (attempt === 0) await new Promise(r => setTimeout(r, 2000));
  }
}

const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  clinic: z.string().trim().min(1, "Please enter your clinic name").max(150),
  phone: z.string().trim().max(30).refine(v => /^\+?[\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15, "Please enter a valid mobile number"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  consent: z.boolean().refine(v => v, "Please tick the box to continue"),
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

/** The clinic leak calculator: inputs, contact gate, result and lead sending. Shared by /calculator and the home page. */
export function LeakCalculator() {
  const [raw, setRaw] = useState<Record<string, string>>(() => Object.fromEntries(Object.entries(defaultInputs).map(([k, v]) => [k, String(v)])));
  const inputs = useMemo<LeakInputs>(() => {
    const o = { ...defaultInputs } as LeakInputs;
    for (const f of fields) o[f.id] = Number(raw[f.id]) || 0;
    o.web = raw["web"] === "yes" ? "yes" : "no";
    o.val = Number(raw["val"]) || 0;
    return o;
  }, [raw]);
  const r = useMemo(() => computeLeak(inputs), [inputs]);
  const set = (k: string, v: string) => setRaw(p => ({ ...p, [k]: v }));

  const [lead, setLead] = useState({ name: "", clinic: "", phone: "", email: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState(false);
  const [sending, setSending] = useState(false);
  const sentRef = useRef(false);
  const utmRef = useRef<Utm>({ utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "" });
  const honeypotRef = useRef<HTMLInputElement>(null);
  useEffect(() => { utmRef.current = readUtm(); }, []);
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
    if (sentRef.current) return;
    sentRef.current = true;
    setSending(true);
    setUnlocked(true);
    if (!honeypotRef.current?.value) void saveLead(parsed.data as Lead, inputs, r, utmRef.current).finally(() => setSending(false));
    else setSending(false);
  };

  const gap = r.reviewGap;
  return <div className="calc-shell calc-grid">
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
            <select id="in-web" value={raw["web"]} onChange={e => set("web", e.target.value)}><option value="no">No</option><option value="yes">Yes</option></select>
          </div>
          <div className="calc-field">
            <label htmlFor="in-val">What a typical new patient pays you, in dollars</label>
            <p className="calc-hint" id="hint-val">From the first visit to the end of their care. If you aren't sure, use a cautious number, because every result above is built on it.</p>
            <input id="in-val" type="number" inputMode="numeric" min={0} step={50} value={raw["val"]} aria-describedby="hint-val" onChange={e => set("val", e.target.value)} />
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
              <input id="lead-consent" type="checkbox" required checked={lead.consent} aria-invalid={!!errors["consent"]} onChange={e => setLead(p => ({ ...p, consent: e.target.checked }))} />
              <span>I agree that ZAAD may call, text or email me about my result and the clinic audit. Message and data rates may apply. Reply STOP to opt out of texts.</span>
            </label>
            {errors["consent"] && <p className="calc-err">{errors["consent"]}</p>}
            <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}><label htmlFor="company_website">Company website</label><input ref={honeypotRef} id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" /></div>
            <Button type="submit" disabled={sending} variant="unstyled" size="unstyled" className="journey-primary calc-btn">Show my result <ArrowRight size={18} /></Button>
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
      </div>;
}
