import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarX, Check, ChevronDown, Clock, PhoneMissed, Star, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import clinic from "@/assets/practice-clinic.jpg";

export function GoodEnquiry() {
  const items = [
    ["Need", "Do they need a treatment you offer?"],
    ["Interest", "Are they actively looking for help, or just browsing?"],
    ["Fit", "Does your location, price and availability suit them?"],
    ["Timing", "Are they ready to book now, or in a few months?"],
  ];
  return <section className="sx sx-light sx-mist" aria-labelledby="ge-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">What makes a good enquiry</span><h2 id="ge-title">More enquiries aren't the goal. <em>The right patients are.</em></h2><p>We check four things before an enquiry reaches your calendar, so your team spends time on people who will book.</p></div>
      <div className="ge-grid">{items.map(([t, d], i) => <div key={t} className="pr-card"><span className="ge-n">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div>
  </section>;
}

export function AdvertsFirst() {
  const gaps = [[Clock, "Replies take a day or more"], [PhoneMissed, "Missed calls go unanswered"], [Star, "Very few recent reviews"], [CalendarX, "No reminders, so patients don't turn up"], [UserX, "Past patients never hear from them"]] as const;
  const fixes = ["Fix how fast enquiries get a reply", "Set up missed-call text-back", "Add reminders before every visit", "Start collecting reviews", "Contact past patients"];
  return <section className="sx sx-light" aria-labelledby="af-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Why we don't start with adverts</span><h2 id="af-title">More adverts won't help if <em>the basics leak.</em></h2></div>
      <div className="zx-af-top">
        <div className="zx-af-card">
          <h3 className="zx-h3">What this looks like in <em>practice</em></h3>
          <p>A practice wants more adverts. But when we look at their setup, we find:</p>
          <ul className="zx-af-rows">{gaps.map(([Icon, t]) => <li key={t}><Icon size={22} strokeWidth={1.6} aria-hidden="true" />{t}</li>)}</ul>
          <p>More adverts at this stage would only burn budget and send more people into the same gaps.</p>
        </div>
        <img src={clinic} alt="Illustration of a small clinic building" loading="lazy" width={1024} height={1024} className="zx-af-img" />
      </div>
      <div className="zx-af-bottom">
        <ul className="zx-pills">{fixes.map(f => <li key={f}><Check size={16} aria-hidden="true" />{f}</li>)}</ul>
        <div className="zx-af-instead">
          <h3 className="zx-h3">What we do instead</h3>
          <span className="zx-mini-pill">Right fixes, in the right order → more booked patients</span>
          <Button asChild variant="unstyled" size="unstyled" className="journey-primary"><Link to="/book">Book a strategy call <ArrowUpRight size={18} aria-hidden="true" /></Link></Button>
        </div>
      </div>
      <p className="af-close">Then we add adverts, once every new enquiry has a clear path to a booking.</p>
    </div>
  </section>;
}

const faqs = [
  ["How long until we see new bookings?", "Setup and launch take about 7 working days after you complete our onboarding form. From then on, new enquiries start getting replies, follow-ups and booking links straight away. How many new patients you see depends on your location, treatments and offer, and we'll set realistic targets with you on the strategy call."],
  ["Is there a long contract?", "The core systems plan is month to month, and you can cancel anytime. The done-for-you Accelerator and Power plans start with a 4-month programme, because advertising needs time to learn and improve, and then continue month to month."],
  ["What do we need to do?", "Tell us your treatments, prices and availability, and connect your calendar. We handle the rest. Your team only steps in for questions that need a person."],
  ["Who replies to patients?", "Patients get quick replies by text and email. Anything that needs a human goes straight to your team in one inbox."],
  ["How is patient information handled?", "Only your practice and our team can see your patient conversations, and we only use them to reply to, follow up with and book your patients. On the strategy call we'll walk you through exactly where your data is stored and who can access it."],
  ["What does the guarantee cover?", "If we don't deliver on the targets we agree with you in the first 30 days, you get your money back."],
];

export function Faq() {
  return <section id="faq" className="sx sx-light" aria-labelledby="faq-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Questions</span><h2 id="faq-title">Frequently asked <em>questions.</em></h2></div>
      <div className="faq-list">{faqs.map(([q, a]) => <details key={q} className="faq-item"><summary>{q}<ChevronDown size={20} aria-hidden="true" /></summary><p>{a}</p></details>)}</div>
    </div>
  </section>;
}
