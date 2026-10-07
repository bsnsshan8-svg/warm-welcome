import { useState } from "react";
import { ArrowRight, Bot, CalendarCheck, Check, Database, Globe, Inbox, Megaphone, MessageSquare, PhoneCall, PhoneMissed, RefreshCw, Search, Send, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function Head({ kicker, title, accent, text }: { kicker: string; title: string; accent: string; text?: string }) {
  return <div className="sx-head"><span className="sx-kicker"><i />{kicker}</span><h2>{title} <em>{accent}</em></h2>{text && <p>{text}</p>}</div>;
}

const leaks = [
  ["01", "Lead comes in", "Slow response means intent disappears."],
  ["02", "Patient calls", "A missed call can become a lost appointment."],
  ["03", "Patient arrives", "Great care deserves a stronger review engine."],
  ["04", "Database ages", "Past patients can become future appointments."],
];

export function ProblemSection() {
  return <section id="problem" className="sx sx-dark" aria-labelledby="problem-title">
    <div className="sx-shell sx-split">
      <div className="sx-head"><span className="sx-kicker"><i />The problem</span><h2 id="problem-title">Getting a lead is <em>not the finish line.</em></h2><p>Acquisition, follow-up, booking and retention are often disconnected. ZAAD connects the entire flow into one system.</p></div>
      <ol className="leak-list">{leaks.map(([n, t, d]) => <li key={n}><span>{n}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
    </div>
  </section>;
}

const modules = [
  { key: "ACQUIRE", title: "Bring the right patients in.", icon: Megaphone, points: ["Paid acquisition", "Local search", "Landing pages", "Offers", "New patient lead generation"], flow: ["Ad / search", "Landing page", "New enquiry"] },
  { key: "NURTURE + BOOK", title: "Every lead gets a next step.", icon: CalendarCheck, points: ["Instant lead response", "Automated follow-up", "Qualification", "Appointment booking", "Appointment confirmation"], flow: ["Enquiry", "AI follow-up", "Booked"] },
  { key: "RECOVER", title: "Missed calls become recoverable.", icon: PhoneCall, points: ["Missed-call detection", "Automated outreach", "Patient conversation recovery", "Appointment confirmation"], flow: ["Missed call", "Text back", "Recovered"] },
  { key: "REPUTATION", title: "Turn great care into visible trust.", icon: Star, points: ["Patient feedback", "Review requests", "Reputation funnel", "Review visibility"], flow: ["Visit", "Feedback", "5★ review"] },
  { key: "REACTIVATE", title: "Turn your old database back into demand.", icon: RefreshCw, points: ["Existing patient database", "Database segmentation", "Targeted offers", "Automated messaging", "Reactivation appointments"], flow: ["Segment", "Offer", "Rebooked"] },
];

const engine = [
  { step: "Attract", label: "Ad / search", icon: Search },
  { step: "Capture", label: "Lead", icon: Users },
  { step: "Nurture", label: "AI follow-up", icon: Bot },
  { step: "Book", label: "Booked", icon: CalendarCheck },
  { step: "Grow", label: "Review / growth", icon: Star },
];

export function SystemModules() {
  const [active, setActive] = useState(0);
  const mod = modules[active] ?? modules[0]!;
  const Icon = mod.icon;
  return <section id="modules" className="sx sx-light" aria-labelledby="modules-title">
    <div className="sx-shell">
      <div className="sx-head" id="modules-title"><span className="sx-kicker"><i />What ZAAD does after the lead</span><h2>One system. <em>Every patient touchpoint.</em></h2></div>
      <div className="mod-tabs" role="tablist" aria-label="ZAAD modules">{modules.map((m, i) => <Button key={m.key} variant="unstyled" size="unstyled" role="tab" id={`tab-${i}`} aria-selected={active === i} aria-controls="mod-panel" className="mod-tab" onClick={() => setActive(i)}>{m.key}</Button>)}</div>
      <div className="mod-panel" id="mod-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <div className="mod-copy"><span className="mod-icon"><Icon size={22} /></span><span className="mod-key">{mod.key}</span><h3>{mod.title}</h3><ul>{mod.points.map(p => <li key={p}><Check size={16} />{p}</li>)}</ul></div>
        <div className="mod-ui"><div className="ui-bar"><span>ZAAD / {mod.key}</span><span className="ui-live"><i />Active</span></div><div className="mod-flow">{mod.flow.map((f, i) => <div key={f} className={i === mod.flow.length - 1 ? "done" : ""}><span>{String(i + 1).padStart(2, "0")}</span><b>{f}</b>{i < mod.flow.length - 1 && <ArrowRight size={16} />}</div>)}</div></div>
      </div>
      <div id="engine" className="engine" aria-labelledby="engine-title">
        <div className="engine-head"><span className="sx-kicker"><i />Patient acquisition engine</span><h3 id="engine-title">From first click to booked patient.</h3></div>
        <ol className="engine-track">{engine.map(({ step, label, icon: E }, i) => <li key={step} className={i === 3 ? "booked" : ""}><span className="engine-icon"><E size={20} /></span><b>{step}</b><small>{label}</small></li>)}</ol>
      </div>
    </div>
  </section>;
}

export function MissedCallSection() {
  return <section id="missed" className="sx sx-dark" aria-labelledby="missed-title">
    <div className="sx-shell sx-split">
      <div className="sx-head"><span className="sx-kicker"><i />Missed call recovery</span><h2 id="missed-title">They called.<br />You missed it.<br /><em>ZAAD keeps the conversation alive.</em></h2><p>When your team can't answer, ZAAD doesn't let the conversation die.</p>
        <ol className="mc-steps">{["Incoming call", "Missed", "Automated message", "Conversation", "Appointment confirmed"].map((s, i) => <li key={s} className={i === 4 ? "booked" : ""}><span>{i + 1}</span>{s}</li>)}</ol></div>
      <div className="sx-phone" aria-label="Missed call recovery conversation example">
        <div className="phone-top"><PhoneCall size={16} /> ZAAD Agent <span className="ui-live"><i />Online</span></div>
        <div className="mc-call"><PhoneMissed size={18} /><div><small>Missed call</small><b>New patient</b></div></div>
        <div className="bubble agent">Hi! We just missed your call. How can we help?</div>
        <div className="bubble patient">I'd like to book an appointment.</div>
        <div className="bubble agent">Absolutely. Which day works best for you?</div>
        <div className="booked-pill"><CalendarCheck size={18} /><span>Appointment confirmed</span><Check size={16} /></div>
      </div>
    </div>
  </section>;
}

const segments = ["All patients", "Inactive", "Previous enquiries", "Past patients"];

export function GrowthSection() {
  const [segment, setSegment] = useState(segments[0]!);
  return <section id="growth" className="sx sx-light" aria-labelledby="growth-title">
    <div className="sx-shell">
      <Head kicker="Reputation + reactivation" title="Value that keeps growing" accent="after the appointment." text="Great patient experiences become visible trust, and your old patient database isn't old revenue." />
      <div className="growth-grid">
        <article className="growth-card"><span className="mod-key"><Star size={16} /> 5-star reputation</span><h3>Turn great care into visible trust.</h3>
          <ol className="g-flow">{["Patient", "Feedback", "5★ review"].map((s, i) => <li key={s} className={i === 2 ? "done" : ""}>{s}</li>)}</ol>
          <div className="g-ui"><Send size={16} /><div><b>Review request sent</b><small>After a completed appointment</small></div><span className="g-stars" aria-label="5 stars">★★★★★</span></div></article>
        <article className="growth-card"><span className="mod-key"><Database size={16} /> Reactivate your database</span><h3>Turn your old database back into demand.</h3>
          <ol className="g-flow">{["Old database", "Targeted offer", "Reply", "New appointment"].map((s, i) => <li key={s} className={i === 3 ? "done" : ""}>{s}</li>)}</ol>
          <div className="seg-chips" role="group" aria-label="Database segment">{segments.map(s => <Button key={s} variant="unstyled" size="unstyled" aria-pressed={segment === s} className="seg-chip" onClick={() => setSegment(s)}>{s}</Button>)}</div>
          <div className="g-ui"><MessageSquare size={16} /><div><b>Targeted offer ready</b><small>Sending to: {segment.toLowerCase()}</small></div><span className="ui-live"><i />Active</span></div></article>
      </div>
    </div>
  </section>;
}

export function CommandCenterSection() {
  return <section id="command" className="sx sx-dark" aria-labelledby="command-title">
    <div className="sx-shell sx-split">
      <div className="sx-head"><span className="sx-kicker"><i />Doctor's command center</span><h2 id="command-title">The doctor's <em>command center.</em></h2><p>See what is happening without manually managing every conversation. ZAAD gives the doctor a clear view of the whole machine — leads, pipeline, appointments and patient growth.</p></div>
      <div className="sx-phone dash" aria-label="Doctor mobile app example">
        <div className="phone-top">ZAAD <span className="ui-live"><i />Connected</span></div>
        <p className="dash-hello">Good morning, Doctor<br /><b>Your patient flow is moving.</b></p>
        {[["Live leads", Users], ["Appointments", CalendarCheck], ["Campaigns", Megaphone], ["UniBox", Inbox], ["Patient conversations", MessageSquare]].map(([label, I]) => { const Ic = I as typeof Users; return <div className="dash-row" key={label as string}><Ic size={18} /><b>{label as string}</b><span className="ui-live"><i />Live</span></div>; })}
      </div>
    </div>
  </section>;
}

const threads = [
  { channel: "Website Chat", icon: Globe, name: "Website visitor", preview: "Hi, do you have availability this week for a consultation?", messages: [["patient", "Hi, do you have availability this week for a consultation?"], ["agent", "Yes! I can help you find a time. Do mornings or afternoons suit you better?"], ["patient", "Afternoons, please."]] },
  { channel: "Missed Calls", icon: PhoneMissed, name: "Missed caller", preview: "Thanks for texting back — I was calling to book.", messages: [["agent", "Hi! We just missed your call. How can we help?"], ["patient", "Thanks for texting back — I was calling to book."], ["agent", "Great, let's get you booked in."]] },
  { channel: "Reactivation", icon: RefreshCw, name: "Past patient", preview: "I saw your message. I'd like to come back in.", messages: [["agent", "It's been a while — we'd love to see you again. Would you like to book a visit?"], ["patient", "I saw your message. I'd like to come back in."]] },
] as const;

const filters = ["All conversations", "Website Chat", "Missed Calls", "Reactivation"] as const;

export function UniBoxSection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All conversations");
  const [openIdx, setOpenIdx] = useState(0);
  const list = threads.map((t, i) => ({ ...t, i })).filter(t => filter === "All conversations" || t.channel === filter);
  const open = threads[openIdx] ?? threads[0];
  return <section id="unibox" className="sx sx-light" aria-labelledby="unibox-title">
    <div className="sx-shell">
      <div className="sx-head" id="unibox-title"><span className="sx-kicker"><i />UniBox</span><h2>Every patient conversation. <em>One place.</em></h2><p>Different channels. One conversation. One clear next step.</p></div>
      <div className="ub-filters" role="group" aria-label="Conversation filter">{filters.map(f => <Button key={f} variant="unstyled" size="unstyled" aria-pressed={filter === f} className="seg-chip" onClick={() => { setFilter(f); const first = threads.findIndex(t => f === "All conversations" || t.channel === f); if (first >= 0) setOpenIdx(first); }}>{f}</Button>)}</div>
      <div className="ub">
        <ul className="ub-list" aria-label="Conversations">{list.map(t => { const I = t.icon; return <li key={t.name}><Button variant="unstyled" size="unstyled" aria-pressed={openIdx === t.i} className="ub-row" onClick={() => setOpenIdx(t.i)}><span className="ub-ic"><I size={18} /></span><span className="ub-text"><b>{t.name}</b><small>{t.channel}</small><span className="ub-prev">{t.preview}</span></span></Button></li>; })}</ul>
        <div className="ub-convo" aria-live="polite"><div className="ui-bar"><span>{open.name} · {open.channel}</span><span className="ui-live"><i />Active</span></div>
          <div className="ub-msgs">{open.messages.map(([who, text], k) => <div key={k} className={`bubble ${who}`}>{text}</div>)}</div>
          <div className="ub-next"><CalendarCheck size={18} /> Next step: offer appointment times</div></div>
      </div>
    </div>
  </section>;
}
