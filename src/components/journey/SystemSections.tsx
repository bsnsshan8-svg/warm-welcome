import { useState } from "react";
import { ArrowRight, CalendarCheck, Check, Globe, Inbox, MessageSquare, PhoneCall, PhoneMissed, Quote, RefreshCw, Search, Send, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function Head({ kicker, title, accent, text }: { kicker: string; title: string; accent: string; text?: string }) {
  return <div className="sx-head"><span className="sx-kicker"><i />{kicker}</span><h2>{title} <em>{accent}</em></h2>{text && <p>{text}</p>}</div>;
}

const leaks = [
  ["01", "Someone asks about an appointment", "If nobody replies quickly, they book somewhere else."],
  ["02", "A patient calls", "A missed call can mean a missed appointment."],
  ["03", "A patient has a great visit", "Without a nudge, few leave a review."],
  ["04", "Time passes", "Past patients drift away unless someone invites them back."],
];

export function ProblemSection() {
  return <section id="problem" className="sx sx-dark" aria-labelledby="problem-title">
    <div className="sx-shell sx-split">
      <div className="sx-head"><span className="sx-kicker"><i />Where patients slip away</span><h2 id="problem-title">An enquiry isn't a patient <em>until they're in your chair.</em></h2><p>Replying, following up, booking and staying in touch often fall between the cracks. ZAAD takes care of each step, so more enquiries become visits.</p></div>
      <ol className="leak-list">{leaks.map(([n, t, d]) => <li key={n}><span>{n}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
    </div>
  </section>;
}

const modules = [
  { key: "Get found", title: "People searching for a clinic like yours find you.", icon: Search, points: ["Show up when locals search for care", "A clear page that makes booking easy", "Offers that give people a reason to visit", "More new patients getting in touch"], flow: ["Emma searches “dentist near me”", "She finds Riverside Dental", "She asks about a check-up"] },
  { key: "Follow up", title: "Every enquiry gets a reply and a booking.", icon: CalendarCheck, points: ["A reply within moments, day or night", "Friendly follow-up if they go quiet", "The right questions before booking", "A reminder before the visit"], flow: ["Emma asks about a check-up", "She gets a reply in minutes", "Consultation, Thursday 3:30 PM"] },
  { key: "Missed calls", title: "A missed call doesn't mean a missed patient.", icon: PhoneCall, points: ["Know when a call is missed", "The caller gets a text back", "The conversation carries on", "The appointment gets booked"], flow: ["James calls at lunchtime", "He gets a text back", "Booked for Monday 9:00 AM"] },
  { key: "Reviews", title: "Turn good visits into reviews.", icon: Star, points: ["Ask patients how their visit went", "Invite happy patients to leave a review", "More reviews where new patients look"], flow: ["Sarah finishes her visit", "She's asked how it went", "She leaves a 5-star review"] },
  { key: "Past patients", title: "Your past patients already trust you. Invite them back.", icon: RefreshCw, points: ["Reach patients you haven't seen in a while", "Send a friendly, relevant message", "They reply and book"], flow: ["Last visit 14 months ago", "A friendly check-up reminder", "Booked for next Tuesday"] },
];

const engine = [
  { step: "Found", label: "A local patient finds your clinic.", icon: Search },
  { step: "Enquiry", label: "They ask about an appointment.", icon: Users },
  { step: "Follow up", label: "They get a quick, friendly reply.", icon: MessageSquare },
  { step: "Booked", label: "The visit is in your calendar.", icon: CalendarCheck },
  { step: "Review", label: "After the visit, they share a review.", icon: Star },
];

export function SystemModules() {
  const [active, setActive] = useState(0);
  return <section id="modules" className="sx sx-light" aria-labelledby="modules-title">
    <div className="sx-shell">
      <div className="sx-head" id="modules-title"><span className="sx-kicker"><i />What ZAAD does for your practice</span><h2>Everything that happens <em>between a first search and a booked visit.</em></h2></div>
      <div className="mod-tabs" role="tablist" aria-label="What ZAAD does">{modules.map((m, i) => <Button key={m.key} variant="unstyled" size="unstyled" role="tab" id={`tab-${i}`} aria-selected={active === i} aria-controls="mod-panel" className="mod-tab" onClick={() => setActive(i)}>{m.key}</Button>)}</div>
      <div className="mod-stack" id="mod-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        {modules.map((mod, index) => { const Icon = mod.icon; return <div key={mod.key} className="mod-panel" data-active={active === index} aria-hidden={active !== index} inert={active !== index}>
        <div className="mod-copy"><span className="mod-icon"><Icon size={22} /></span><span className="mod-key">{mod.key}</span><h3>{mod.title}</h3><ul>{mod.points.map(p => <li key={p}><Check size={16} />{p}</li>)}</ul></div>
        <div className="mod-ui"><div className="ui-bar"><span>Riverside Dental</span></div><div className="mod-flow">{mod.flow.map((f, i) => <div key={f} className={i === mod.flow.length - 1 ? "done" : ""}><span>{i + 1}</span><b>{f}</b>{i < mod.flow.length - 1 && <ArrowRight size={16} />}</div>)}</div></div>
        </div>; })}
      </div>
      <div id="engine" className="engine" aria-labelledby="engine-title">
        <div className="engine-head"><span className="sx-kicker"><i />A patient's path</span><h3 id="engine-title">From first search to a booked visit.</h3></div>
        <ol className="engine-track">{engine.map(({ step, label, icon: E }, i) => <li key={step} className={i === 3 ? "booked" : ""}><span className="engine-icon"><E size={20} /></span><b>{step}</b><small>{label}</small></li>)}</ol>
      </div>
    </div>
  </section>;
}

export function MissedCallSection() {
  return <section id="missed" className="sx sx-dark" aria-labelledby="missed-title">
    <div className="sx-shell sx-split">
      <div className="sx-head"><span className="sx-kicker"><i />Missed calls</span><h2 id="missed-title">They called.<br />You missed it.<br /><em>They still get a reply.</em></h2><p>Calls during busy moments are covered by an assistant that replies when your team can't. The caller gets a text and an easy way to book.</p>
        <ol className="mc-steps">{["James calls", "Nobody can answer", "He gets a text back", "He replies", "Appointment booked"].map((s, i) => <li key={s} className={i === 4 ? "booked" : ""}><span>{i + 1}</span>{s}</li>)}</ol></div>
      <div className="sx-phone" aria-label="Missed call text conversation example">
        <div className="phone-top"><PhoneCall size={16} /> Riverside Dental</div>
        <div className="mc-call"><PhoneMissed size={18} /><div><small>Missed call, 12:40 PM</small><b>James Carter</b></div></div>
        <div className="bubble agent">Hi James, sorry we missed your call at Riverside Dental. How can we help?</div>
        <div className="bubble patient">I'd like to book a check-up.</div>
        <div className="bubble agent">Of course. Would Monday at 9:00 AM suit you?</div>
        <div className="booked-pill"><CalendarCheck size={18} /><span>Check-up, Monday 9:00 AM</span><Check size={16} /></div>
      </div>
    </div>
  </section>;
}

const segments = ["Everyone", "Not seen in a year", "Asked but never booked", "Due a check-up"];

export function GrowthSection() {
  const [segment, setSegment] = useState(segments[0]!);
  return <section id="growth" className="sx sx-light" aria-labelledby="growth-title">
    <div className="sx-shell">
      <Head kicker="Reviews and past patients" title="Good care keeps paying off" accent="after the appointment." text="Happy patients share their experience, and past patients come back when you invite them." />
      <div className="growth-grid">
        <article className="growth-card"><span className="mod-key"><Star size={16} /> More 5-star reviews</span><h3>Turn good visits into reviews.</h3>
          <ol className="g-flow">{["Sarah's visit", "How did it go?", "5★ review"].map((s, i) => <li key={s} className={i === 2 ? "done" : ""}>{s}</li>)}</ol>
          <div className="g-ui"><Send size={16} /><div><b>Review invitation sent to Sarah</b><small>After her cleaning on Tuesday</small></div><span className="g-stars" aria-label="5 stars">★★★★★</span></div></article>
        <article className="growth-card"><span className="mod-key"><RefreshCw size={16} /> Bring past patients back</span><h3>Your past patients already trust you. Invite them back.</h3>
          <ol className="g-flow">{["Past patient", "Friendly invite", "Reply", "New appointment"].map((s, i) => <li key={s} className={i === 3 ? "done" : ""}>{s}</li>)}</ol>
          <div className="seg-chips" role="group" aria-label="Which past patients">{segments.map(s => <Button key={s} variant="unstyled" size="unstyled" aria-pressed={segment === s} className="seg-chip" onClick={() => setSegment(s)}>{s}</Button>)}</div>
          <div className="g-ui"><MessageSquare size={16} /><div><b>Check-up reminder ready</b><small>Going to: {segment.toLowerCase()}</small></div></div></article>
      </div>
    </div>
  </section>;
}

export function CommandCenterSection() {
  const rows: [string, typeof Users][] = [["12 new patients this week", Users], ["8 appointments today", CalendarCheck], ["3 missed calls recovered", PhoneCall], ["4 new reviews", Star], ["5 messages waiting in UniBox", Inbox]];
  return <section id="command" className="sx sx-dark" aria-labelledby="command-title">
    <div className="sx-shell sx-split">
      <div className="sx-head"><span className="sx-kicker"><i />On your phone</span><h2 id="command-title">Your practice, <em>at a glance.</em></h2><p>See what's happening without managing every conversation yourself: new patients, today's bookings, and messages that need you.</p></div>
      <div className="sx-phone dash" aria-label="Practice summary on a phone, example">
        <div className="phone-top">Riverside Dental</div>
        <p className="dash-hello">Good morning, Dr. Patel<br /><b>Here's your week so far.</b></p>
        {rows.map(([label, Ic]) => <div className="dash-row" key={label}><Ic size={18} /><b>{label}</b></div>)}
      </div>
    </div>
  </section>;
}

const threads = [
  { channel: "Website", icon: Globe, name: "Emma Wilson", preview: "Hi, do you have anything this week for a consultation?", messages: [["patient", "Hi, do you have anything this week for a consultation?"], ["agent", "Yes, we do. Would Thursday at 3:30 PM work for you?"], ["patient", "Thursday is perfect, thank you."]] },
  { channel: "Missed calls", icon: PhoneMissed, name: "James Carter", preview: "Thanks for texting back, I was calling to book.", messages: [["agent", "Hi James, sorry we missed your call. How can we help?"], ["patient", "Thanks for texting back, I was calling to book."], ["agent", "Of course. Would Monday at 9:00 AM suit you?"]] },
  { channel: "Past patients", icon: RefreshCw, name: "Maria Lopez", preview: "Thanks for the reminder, I'd like to come back in.", messages: [["agent", "Hi Maria, it's been a while. You're due a check-up. Would you like to book?"], ["patient", "Thanks for the reminder, I'd like to come back in."]] },
] as const;

const filters = ["All messages", "Website", "Missed calls", "Past patients"] as const;

export function UniBoxSection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All messages");
  const [openIdx, setOpenIdx] = useState(0);
  const list = threads.map((t, i) => ({ ...t, i })).filter(t => filter === "All messages" || t.channel === filter);
  const open = threads[openIdx] ?? threads[0];
  return <section id="unibox" className="sx sx-light" aria-labelledby="unibox-title">
    <div className="sx-shell">
      <div className="sx-head" id="unibox-title"><span className="sx-kicker"><i />UniBox, one inbox for every patient message</span><h2>Every patient conversation. <em>One place.</em></h2><p>Website, texts and calls together, with one clear next step.</p></div>
      <div className="ub-filters" role="group" aria-label="Message filter">{filters.map(f => <Button key={f} variant="unstyled" size="unstyled" aria-pressed={filter === f} className="seg-chip" onClick={() => { setFilter(f); const first = threads.findIndex(t => f === "All messages" || t.channel === f); if (first >= 0) setOpenIdx(first); }}>{f}</Button>)}</div>
      <div className="ub">
        <ul className="ub-list" aria-label="Messages">{list.map(t => { const I = t.icon; return <li key={t.name}><Button variant="unstyled" size="unstyled" aria-pressed={openIdx === t.i} className="ub-row" onClick={() => setOpenIdx(t.i)}><span className="ub-ic"><I size={18} /></span><span className="ub-text"><b>{t.name}</b><span className="ub-prev" title={t.preview}>{t.preview}</span></span><small className="ub-meta">{t.channel}</small></Button></li>; })}</ul>
        <div className="ub-convo" aria-live="polite"><div className="ui-bar"><span>{open.name} · {open.channel}</span></div>
          <div className="ub-msgs">{open.messages.map(([who, text], k) => <div key={k} className={`bubble ${who}`}>{text}</div>)}</div>
          <div className="ub-next"><CalendarCheck size={18} /> Next step: confirm the appointment</div></div>
      </div>
    </div>
  </section>;
}

export function TestimonialsPlaceholder() {
  return <section id="testimonials" className="sx sx-dark" aria-labelledby="testimonials-title">
    {/* PLACEHOLDER: replace these cards with real testimonials from your practices. */}
    <div className="sx-shell">
      <Head kicker="What practices say" title="Testimonials" accent="coming soon." />
      <div className="testimonial-grid">{[1, 2, 3].map(n => <figure key={n} className="testimonial-placeholder"><Quote size={20} /><blockquote>Testimonial placeholder {n}. Add a real quote from a practice here.</blockquote><figcaption>Name, practice</figcaption></figure>)}</div>
    </div>
  </section>;
}
