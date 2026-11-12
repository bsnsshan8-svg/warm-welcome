import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const journeyStages = [
  { t: "We find them", d: "Adverts reach people near your clinic who are looking for care. Each advert sends them to a short form or your website, never to a blank page.", p: ["Facebook and Instagram adverts aimed at your area", "One clear offer per advert", "Every enquiry is captured in one place, so none is lost"] },
  { t: "We answer at once", d: "The moment someone enquires, they get a reply. Missed call? A text goes out within a minute. Message at night? It is answered before they try another clinic.", p: ["Instant text-back on missed calls", "Website chat and form replies", "First reply within minutes, around the clock"] },
  { t: "We follow up", d: "Not everyone books first time. Friendly, helpful messages and calls keep the conversation going over the next days, until they book or tell us no.", p: ["A text and email sequence over several days", "A phone call where it helps", "Stops the moment they book or opt out"] },
  { t: "We check they are a fit", d: "A few simple questions find out if the person is local, wants the service you offer, and can come in when you are open. Your team only spends time on people who are ready.", p: ["Location and service match", "Preferred days and times", "No health details are collected in texts or forms"] },
  { t: "They are booked, reminded and turn up", d: "The appointment goes straight into your calendar. Reminders go out before the visit, and your team is told who is coming and why they enquired.", p: ["Booking into your calendar", "Reminder texts and emails before the visit", "A quick follow-up after the visit and a review request"] },
];
const num = (i: number) => String(i + 1).padStart(2, "0");

export function AdToChair({ compact = false, id, calcHref = "#estimator" }: { compact?: boolean; id?: string; calcHref?: string }) {
  const [a, setA] = useState(0);
  const st = journeyStages[a]!;
  return <section id={id} className={`sx sx-light atc ${compact ? "atc-compact" : ""}`} aria-labelledby={`${id ?? "atc"}-title`}>
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">The full journey</span><h2 id={`${id ?? "atc"}-title`}>From first advert to patient <em>in your chair</em></h2><p>Most clinics only see the booking. Here is everything that happens before it.</p></div>
      {compact ? <ol className="atc-list">{journeyStages.map((s, i) => <li key={s.t}><span className="atc-n">{num(i)}</span><div><h3>{s.t}</h3><p>{s.d}</p></div></li>)}</ol> : <>
        <ol className="atc-list atc-mobile">{journeyStages.map((s, i) => <li key={s.t}><span className="atc-n">{num(i)}</span><div><h3>{s.t}</h3><p>{s.d}</p><ul>{s.p.map(x => <li key={x}><Check size={16} aria-hidden="true" />{x}</li>)}</ul></div></li>)}</ol>
        <div className="atc-desk">
          <div className="atc-steps" role="tablist" aria-label="Journey stages">{journeyStages.map((s, i) => <button key={s.t} type="button" role="tab" id={`atc-tab-${i}`} aria-selected={i === a} aria-controls="atc-panel" onClick={() => setA(i)}><span className="atc-n">{num(i)}</span>{s.t}</button>)}</div>
          <div className="atc-panel" id="atc-panel" role="tabpanel" aria-labelledby={`atc-tab-${a}`} key={a}>
            <span className="px-step">Stage {num(a)}</span><h3>{st.t}</h3><p>{st.d}</p>
            <ul>{st.p.map(x => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
          </div>
        </div>
      </>}
      <div className="atc-foot">
        <p>Every step is tracked, so you can see how many enquiries came in, how many were answered, and how many booked.</p>
        <Button asChild variant="unstyled" size="unstyled" className="journey-primary"><a href={calcHref}>Run the free clinic calculator <ArrowUpRight size={18} /></a></Button>
        <small>Results depend on your area, offer and how quickly your team follows up.</small>
      </div>
    </div>
  </section>;
}
