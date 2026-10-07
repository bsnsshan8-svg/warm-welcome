import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Database,
  HeartPulse,
  Inbox,
  Menu,
  MessageSquare,
  PhoneCall,
  Play,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ZAAD | Patient Acquisition for Healthcare Practices" },
      { name: "description", content: "ZAAD builds the patient acquisition system that brings patients in, follows up automatically, and books appointments." },
      { property: "og:title", content: "ZAAD | Patient Acquisition for Healthcare Practices" },
      { property: "og:description", content: "ZAAD builds the patient acquisition system that brings patients in, follows up automatically, and books appointments." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hello-hub-host.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://hello-hub-host.lovable.app/" }],
  }),
});

const capabilities = [
  { n: "01", title: "BRING PATIENTS IN", text: "Paid ads, local search, landing pages, offers and conversion-focused campaigns.", icon: Users, demo: "AD → NEW ENQUIRY" },
  { n: "02", title: "NURTURE + BOOK", text: "Every enquiry gets an immediate response, qualification, follow-up and booking pathway.", icon: CalendarCheck, demo: "AI FOLLOW-UP → BOOKED" },
  { n: "03", title: "RECOVER MISSED CALLS", text: "When nobody answers, ZAAD reaches back out and works to recover the appointment.", icon: PhoneCall, demo: "MISSED CALL → RECOVERED" },
  { n: "04", title: "5-STAR REPUTATION", text: "Turn completed patient experiences into review requests and build a stronger reputation.", icon: Star, demo: "EXPERIENCE → 5-STAR" },
  { n: "05", title: "REACTIVATE YOUR DATABASE", text: "Launch targeted reactivation campaigns and offers through messaging.", icon: RefreshCw, demo: "OLD PATIENT → REBOOKED" },
  { n: "06", title: "MANAGE IT ALL", text: "A mobile command center to monitor leads, conversations, appointments and performance.", icon: HeartPulse, demo: "EVERYTHING → ONE VIEW" },
];

const journey = [
  ["01", "AD / SEARCH", "Patient discovers the clinic."],
  ["02", "NEW ENQUIRY", "Website, form, chat or call."],
  ["03", "AI + HUMAN FOLLOW-UP", "Immediate response, qualification and nurturing."],
  ["04", "APPOINTMENT BOOKED", "The patient moves into the clinic calendar."],
  ["05", "PATIENT ARRIVES", "The goal isn't a lead. It's a real patient."],
  ["06", "REVIEW + REACTIVATION", "The relationship continues after the appointment."],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCapability, setActiveCapability] = useState(0);
  const [appleDone, setAppleDone] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL PATIENTS");
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setVisible((v) => ({ ...v, [entry.target.id]: true }))),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeCap = capabilities[activeCapability] ?? capabilities[0];
  if (!activeCap) return null;
  const reveal = (id: string) => visible[id] ? "reveal reveal-on" : "reveal";

  return (
    <main className="zaad-site">
      <header className="nav-wrap">
        <nav className="nav shell">
          <a className="brand" href="#top" aria-label="ZAAD home"><img className="brand-logo" src={zaadLogo.url} alt="ZAAD — Zero Apples A Day" /></a>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#system" onClick={() => setMenuOpen(false)}>System</a>
            <a href="#flow" onClick={() => setMenuOpen(false)}>Patient Flow</a>
            <a href="#unibox" onClick={() => setMenuOpen(false)}>UniBox</a>
            <a href="#command" onClick={() => setMenuOpen(false)}>Command Center</a>
          </div>
          <a className="nav-cta" href="#contact">BOOK A STRATEGY CALL <ArrowRight size={15} /></a>
          <Button variant="unstyled" size="unstyled" className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
        </nav>
      </header>

      <section id="top" className="hero dark-section">
        <div className="hero-grid" />
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="shell hero-inner">
          <div className="hero-copy reveal reveal-on">
            <div className="eyebrow"><span className="live-dot" /> PATIENT ACQUISITION SYSTEM</div>
            <h1>AN APPLE A DAY<br /><span className="muted-title">KEEPS THE DOCTOR AWAY.</span></h1>
            <Button variant="unstyled" size="unstyled" className={`apple-switch ${appleDone ? "done" : ""}`} onClick={() => setAppleDone(!appleDone)} aria-label="Transform apple into ZAAD">
              <span className="apple">🍎</span><span className="switch-line" /><span className="switch-copy">{appleDone ? "ZAAD DOES THE OPPOSITE." : "TAP TO SEE WHAT ZAAD DOES."}</span><ArrowRight size={17} />
            </Button>
            <p>ZAAD builds the patient acquisition system that brings the right people in, follows up automatically, books appointments, and keeps your pipeline moving.</p>
            <div className="hero-actions"><a className="btn primary" href="#contact">BOOK A STRATEGY CALL <ArrowRight size={17} /></a><a className="btn ghost" href="#system"><Play size={15} fill="currentColor" /> SEE HOW ZAAD WORKS</a></div>
          </div>

          <div className="hero-product">
            <div className="product-window">
              <div className="window-bar"><div className="window-dots"><b /><b /><b /></div><span>ZAAD / PATIENT FLOW</span><span className="secure"><ShieldCheck size={12} /> LIVE SYSTEM</span></div>
              <div className="flow-visual">
                {[["AD", "Reach"], ["LEAD", "Capture"], ["AI", "Follow-up"], ["BOOKED", "Appointment"], ["PATIENT", "Arrived"]].map(([a,b], i) => <div className="flow-node" key={a} style={{ animationDelay: `${i * 0.2}s` }}><span>{a}</span><small>{b}</small>{i < 4 && <div className="flow-link" />}</div>)}
                <div className="flow-review"><Star size={12} fill="currentColor" /> REVIEW + REACTIVATION</div>
              </div>
              <div className="mini-stats"><div><small>NEW LEADS</small><strong>128</strong><em>+24.8%</em></div><div><small>APPOINTMENTS</small><strong>64</strong><em>+18.2%</em></div><div><small>RECOVERED</small><strong>19</strong><em>+31.4%</em></div></div>
            </div>
            <div className="float-card float-message"><MessageSquare size={16} /><div><small>ZAAD AGENT</small><b>Appointment confirmed</b></div><Check size={16} /></div>
            <div className="float-card float-review"><span className="stars">★★★★★</span><b>New 5-star review</b><small>"Really easy to book."</small></div>
          </div>
        </div>
        <div className="scroll-cue"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section id="system" className="light-section system-section">
        <div className="shell">
          <div className="section-heading reveal reveal-on" data-reveal id="system-head"><span className="kicker">01 / THE ENGINE</span><h2>THE ZAAD <span>SYSTEM</span></h2><p>Everything you need to bring in patients and keep them coming back.</p></div>
          <div className="capability-layout">
            <div className="capability-list">{capabilities.map((c, i) => { const Icon = c.icon; return <Button variant="unstyled" size="unstyled" key={c.n} className={`capability ${activeCapability === i ? "active" : ""}`} onMouseEnter={() => setActiveCapability(i)} onClick={() => setActiveCapability(i)}><span>{c.n}</span><Icon size={20} /><div><b>{c.title}</b><p>{c.text}</p></div><ArrowRight size={17} /></Button>; })}</div>
            <div className="capability-demo"><div className="demo-label">INTERACTIVE SYSTEM PREVIEW <CircleDot size={11} /></div><div className="demo-main"><div className="demo-icon">{(() => { const Icon = activeCap.icon; return <Icon />; })()}</div><span className="demo-number">{activeCap.n}</span><h3>{activeCap.title}</h3><p>{activeCap.demo}</p><div className="demo-path"><span /><i /><span /><i /><span /></div></div><div className="demo-footer"><span>ZAAD / MODULE {activeCap.n}</span><span>ACTIVE <i /></span></div></div>
          </div>
        </div>
      </section>

      <section className="problem-section dark-section">
        <div className="shell problem-grid">
          <div className="problem-copy"><span className="kicker blue">02 / THE PROBLEM</span><h2>MOST CLINICS DON'T HAVE A <span>LEAD PROBLEM.</span><br />THEY HAVE A PATIENT FLOW PROBLEM.</h2><p>Acquisition, follow-up, booking and retention are often disconnected. ZAAD connects the entire flow into one system.</p></div>
          <div className="broken-flow"><div className="problem-item"><b>01</b><span>Not enough consistent enquiries</span><i>×</i></div><div className="problem-item"><b>02</b><span>Poor visibility / weak acquisition</span><i>×</i></div><div className="problem-item"><b>03</b><span>Leads aren't followed up fast enough</span><i>×</i></div><div className="problem-item"><b>04</b><span>Missed calls become missed appointments</span><i>×</i></div><div className="broken-center"><span>DISCONNECTED</span><strong>ZAAD</strong></div></div>
        </div>
        <div className="connect-line"><span>TRAFFIC</span><i /><span>ENQUIRY</span><i /><span>FOLLOW-UP</span><i /><span>BOOKING</span><i /><span>PATIENT</span><i /><span>REVIEW</span><i /><span>REACTIVATION</span></div>
      </section>

      <section id="flow" className="journey-section light-section">
        <div className="shell"><div className="section-heading centered reveal reveal-on" data-reveal id="journey-head"><span className="kicker">03 / THE JOURNEY</span><h2>FROM FIRST CLICK <span>TO PATIENT.</span></h2><p>Every handoff is designed to move one thing forward: the patient.</p></div>
          <div className="journey-track">{journey.map(([n,title,text], i) => { const JIcon = [Search, MessageSquare, Bot, CalendarCheck, Users, Star][i] ?? Star; return <div className="journey-card" key={n}><div className="journey-top"><span>{n}</span>{i < journey.length - 1 && <ArrowRight size={15} />}</div><div className="journey-icon"><JIcon size={22} /></div><h3>{title}</h3><p>{text}</p></div>; })}</div>
        </div>
      </section>

      <section className="missed-section dark-section">
        <div className="shell split-feature"><div className="feature-copy"><span className="kicker blue">04 / MISSED CALL RECOVERY</span><h2>NEVER LOSE ANOTHER PATIENT <span>TO A MISSED CALL.</span></h2><p>When your team can't answer, ZAAD doesn't let the conversation die.</p><div className="feature-points"><span><Check size={14} /> Instant response</span><span><Check size={14} /> Conversation continues</span><span><Check size={14} /> Appointment recovery</span></div></div>
          <div className="phone-wrap"><div className="phone"><div className="phone-notch" /><div className="phone-head"><PhoneCall size={16} /><b>ZAAD AGENT</b><small>● online</small></div><div className="call-card"><span className="call-icon"><PhoneCall size={18} /></span><div><small>MISSED CALL</small><b>Unknown patient</b></div><em>10:42 AM</em></div><div className="chat"><div className="chat-bubble agent">Hi! We just missed your call. How can we help?</div><div className="chat-bubble patient">I'd like to book an appointment.</div><div className="chat-bubble agent">Absolutely. I can help with that. Would tomorrow at 3:30 PM work?</div><div className="typing"><i /><i /><i /></div></div><div className="phone-booked"><CalendarCheck size={17} /><span><small>APPOINTMENT CONFIRMED</small><b>Tomorrow · 3:30 PM</b></span><Check size={16} /></div></div></div>
        </div>
      </section>

      <section className="review-section light-section"><div className="shell split-feature reverse"><div className="review-visual"><div className="review-window"><div className="review-head"><div><span>REPUTATION ENGINE</span><b>Patient experience → trust</b></div><Star size={24} fill="currentColor" /></div><div className="review-flow"><div><CalendarCheck /><b>APPOINTMENT<br />COMPLETED</b></div><ArrowRight /><div><Send /><b>REVIEW<br />REQUEST</b></div><ArrowRight /><div className="review-result"><span>★★★★★</span><b>5.0</b><small>Google Review</small></div></div><div className="quote">“The team made everything incredibly easy. Would absolutely recommend.”<small>— Verified patient</small></div><div className="counter-float"><span>5.0</span><div>AVERAGE RATING<br /><b>+ 28 NEW REVIEWS</b></div></div></div></div><div className="feature-copy"><span className="kicker">05 / REPUTATION</span><h2>TURN GREAT PATIENT EXPERIENCES <span>INTO 5-STAR MOMENTS.</span></h2><p>Completed appointments trigger thoughtful review requests, helping your best patient experiences become visible trust.</p><div className="stars-large">★★★★★</div></div></div></section>

      <section className="reactivation-section dark-section"><div className="shell"><div className="section-heading centered"><span className="kicker blue">06 / REACTIVATION</span><h2>YOUR OLD PATIENT DATABASE <span>ISN'T OLD REVENUE.</span></h2><p>We take the patients and leads already sitting inside your database and give them a reason to come back.</p></div><div className="reactivation-ui"><div className="database-panel"><div className="panel-title"><Database size={17} /> PATIENT DATABASE <span>1,842 RECORDS</span></div><div className="filters">{["ALL PATIENTS", "INACTIVE", "PREVIOUS ENQUIRIES", "PAST PATIENTS", "HIGH-VALUE PATIENTS"].map(f => <Button variant="unstyled" size="unstyled" className={activeFilter === f ? "selected" : ""} onClick={() => setActiveFilter(f)} key={f}>{f}</Button>)}</div><div className="patient-rows"><div><span className="avatar">AS</span><b>Alex Stone</b><small>Inactive · 8 months</small><em>SELECTED</em></div><div><span className="avatar">MJ</span><b>Maya Jones</b><small>Past patient · 5 months</small><em>SELECTED</em></div><div><span className="avatar">RK</span><b>Ryan Khan</b><small>Previous enquiry</small><em>SELECTED</em></div></div></div><div className="campaign-arrow"><ArrowRight /></div><div className="campaign-panel"><span className="campaign-tag">TARGETED OFFER</span><h3>20% OFF YOUR<br />NEXT APPOINTMENT</h3><p>Sent to {activeFilter.toLowerCase()} via messaging.</p><div className="campaign-send"><MessageSquare size={15} /> CAMPAIGN SENT <Check size={15} /></div><div className="campaign-result"><b>REPLIES</b><strong>84</strong><span>→</span><b>REBOOKED</b><strong>31</strong></div></div></div></div></section>

      <section id="command" className="command-section light-section"><div className="shell split-feature"><div className="feature-copy"><span className="kicker">07 / COMMAND CENTER</span><h2>YOUR ENTIRE PATIENT PIPELINE. <span>IN YOUR POCKET.</span></h2><p>See what is happening without manually managing every conversation. ZAAD gives the doctor a clear view of the whole machine.</p><div className="mobile-list"><span><Check /> New Leads</span><span><Check /> Appointments</span><span><Check /> Missed Calls</span><span><Check /> Reactivated Patients</span></div></div><div className="dashboard-phone"><div className="dash-notch" /><div className="dash-header"><span>9:41</span><span>ZAAD</span><span>•••</span></div><div className="dash-greeting">Good morning, Doctor <span>✦</span><b>Your patient flow is moving.</b></div><div className="dash-grid"><div><small>NEW LEADS</small><b>128</b><em>+24.8%</em></div><div><small>BOOKED</small><b>64</b><em>+18.2%</em></div><div><small>FOLLOW-UPS</small><b>42</b><em>12 due</em></div><div><small>REVIEWS</small><b>4.9</b><em>+18 this week</em></div></div><div className="dash-progress"><span>PIPELINE PROGRESS</span><b>78%</b><div><i /></div></div><div className="notification"><span><MessageSquare size={15} /></span><div><b>New enquiry qualified</b><small>ZAAD agent booked Sarah for 2:00 PM</small></div><small>now</small></div></div></div></section>

      <section id="unibox" className="unibox-section dark-section"><div className="shell"><div className="section-heading centered"><span className="kicker blue">08 / UNIBOX</span><h2>EVERY PATIENT CONVERSATION. <span>ONE PLACE.</span></h2><p>Different channels. One conversation. One clear next step.</p></div><div className="unibox"><div className="channel-rail"><span><MessageSquare /> Website Chat</span><span><PhoneCall /> Phone Calls</span><span><Send /> SMS</span><span><MessageSquare /> Messaging</span><span><Search /> Lead Forms</span><span><Zap /> Campaigns</span></div><div className="inbox-core"><div className="inbox-head"><div><Inbox /><b>ZAAD UNIBOX</b></div><span>6 CHANNELS CONNECTED</span></div><div className="conversation"><div className="conv-list"><div className="conv active"><span className="avatar blue-avatar">SJ</span><div><b>Sarah Johnson</b><small>I'd like to book...</small></div><em>2m</em><i>AI</i></div><div className="conv"><span className="avatar">AM</span><div><b>Alex Morgan</b><small>Thanks, see you then!</small></div><em>9m</em></div><div className="conv"><span className="avatar">RB</span><div><b>Ryan Brown</b><small>Can I move my...</small></div><em>21m</em></div></div><div className="chat-panel"><div className="chat-panel-head"><span className="avatar blue-avatar">SJ</span><div><b>Sarah Johnson</b><small>New Lead · Website</small></div><span className="status">QUALIFIED</span></div><div className="panel-messages"><div className="p-msg incoming">Hi, I found you through Google. I'd like to know if you have appointments this week.</div><div className="p-msg outgoing">Absolutely, Sarah. I can help with that. What day works best?</div><div className="p-msg incoming">Thursday afternoon would be perfect.</div></div><div className="booking-strip"><CalendarCheck size={16} /><span><b>APPOINTMENT REQUESTED</b><small>Thursday · afternoon</small></span><Button variant="unstyled" size="unstyled">BOOK</Button></div></div></div></div></div></div></section>

      <section className="loop-section light-section"><div className="shell"><div className="section-heading centered"><span className="kicker">09 / THE LOOP</span><h2>ONE SYSTEM. <span>A PATIENT GROWTH LOOP.</span></h2><p>ZAAD doesn't stop at generating the lead. We build what happens after the click.</p></div><div className="loop"><div className="loop-ring" />{["ATTRACT","CAPTURE","NURTURE","BOOK","SHOW UP","REVIEW","REACTIVATE"].map((x,i) => <div className="loop-node" key={x} style={{ transform: `rotate(${i * 51.4}deg) translateY(calc(-1 * var(--loop-radius))) rotate(-${i * 51.4}deg)` }}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}<div className="loop-center"><strong>ZAAD</strong><small>MORE PATIENTS</small><ArrowRight /></div></div></div></section>

      <section id="contact" className="final-cta dark-section"><div className="cta-grid" /><div className="shell cta-content"><span className="kicker blue">10 / READY?</span><h2>READY TO BRING<br /><span>MORE PATIENTS IN?</span></h2><p>Let's build a patient acquisition system around your practice.</p><div className="hero-actions"><a className="btn primary" href="mailto:hello@zaad.health">BOOK A STRATEGY CALL <ArrowRight size={17} /></a><a className="btn ghost" href="#system">SEE HOW ZAAD WORKS <ChevronDown size={15} /></a></div><div className="cta-flow"><span>TRAFFIC</span><i /><span>LEAD</span><i /><span>NURTURE</span><i /><span>APPOINTMENT</span><i /><span>PATIENT</span></div></div></section>

      <footer className="footer"><div className="shell footer-inner"><a className="brand" href="#top" aria-label="ZAAD home"><img className="brand-logo" src={zaadLogo.url} alt="ZAAD — Zero Apples A Day" /></a><span>Patient Acquisition Machine for Healthcare Practices.</span><div><a href="#system">System</a><a href="#flow">Flow</a><a href="#unibox">UniBox</a></div><small>© 2026 ZAAD. Built for patient growth.</small></div></footer>
    </main>
  );
}
