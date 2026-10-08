import { Check, ChevronDown, User } from "lucide-react";

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
  return <section className="sx sx-light" aria-labelledby="af-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Why we don't start with adverts</span><h2 id="af-title">More adverts won't help if <em>the basics leak.</em></h2></div>
      <div className="af-grid">
        <div className="pr-card"><span className="ge-n">A typical starting point</span><p>A practice wants more adverts. But replies take a day, missed calls go unanswered, reviews are thin and nobody follows up with past patients. More adverts would just send more people into the same gaps.</p></div>
        <div className="pr-card pr-dark"><h3>What we do first</h3>
          <ul className="af-ticks">{["Fix how quickly enquiries get a reply", "Set up missed-call text-back and reminders", "Start collecting reviews", "Contact past patients who haven't been back"].map(t => <li key={t}><Check size={18} aria-hidden="true" />{t}</li>)}</ul>
        </div>
      </div>
      <p className="af-close">Then we add adverts, once every new enquiry has a clear path to a booking.</p>
    </div>
  </section>;
}

export function FounderSection() {
  return <section className="sx sx-light sx-mist" aria-labelledby="fo-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">Who's behind ZAAD</span><h2 id="fo-title">Built for practices, <em>not for everyone.</em></h2></div>
      <div className="pr-card fo-card">
        <div>
          <p>ZAAD was founded by Azan Tariq and Farhan Ali to help medical practices turn more enquiries into booked patients. We kept seeing the same thing: practices paying to attract patients, then losing them to slow replies, missed calls and no follow-up. So we built ZAAD around everything that happens after someone gets in touch.</p>
          <div className="fo-people">{["Azan Tariq", "Farhan Ali"].map(n => <div key={n} className="fo-person"><span className="fo-photo" aria-hidden="true"><User size={36} /></span><p className="fo-name"><b>{n}</b>, Co-founder</p></div>)}</div>
          <p className="fo-contact">Based in Kalispell, Montana. Call <a href="tel:+14089423358">+1 408 942 3358</a> or email <a href="mailto:Info@zeroapplesaday.com">Info@zeroapplesaday.com</a>.</p>
        </div>
      </div>
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
