import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock3, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const enquiries = [
  { day: 0, time: "Mon 7:40 PM", kind: "Missed call", wait: "next morning, 9:00 AM", booked: "Tue 10:30 AM", appointmentDay: 1, slot: "morning" },
  { day: 1, time: "Tue 11:15 PM", kind: "Website form", wait: "next morning, 9:00 AM", booked: "Wed 11:00 AM", appointmentDay: 2, slot: "morning" },
  { day: 3, time: "Thu 9:05 PM", kind: "Missed call", wait: "next morning, 9:00 AM", booked: "Fri 2:00 PM", appointmentDay: 4, slot: "afternoon" },
  { day: 5, time: "Sat 4:20 PM", kind: "Website chat", wait: "Monday, 9:00 AM", booked: "Mon 10:00 AM", appointmentDay: 0, slot: "morning" },
  { day: 6, time: "Sun 10:30 AM", kind: "Missed call", wait: "Monday, 9:00 AM", booked: "Mon 11:30 AM", appointmentDay: 0, slot: "late-morning" },
];

export function ClinicWeek() {
  const [enabled, setEnabled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const controlled = useRef(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      timer = setTimeout(() => { if (!controlled.current) setEnabled(true); }, 2500);
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);
  const choose = (value: boolean) => { controlled.current = true; setEnabled(value); };
  const card = (event: typeof enquiries[number], index: number) => <article key={`${enabled}-${index}`} className={`cw-event cw-event-${index}`}>
    <div className="cw-event-heading"><b>{event.time}</b><span>{event.kind}</span></div>
    {enabled ? <>
      <div className="cw-sent"><Send size={16} aria-hidden="true" /><span>Text with booking link sent in 1 minute</span></div>
      <div className="cw-booked"><Check size={16} aria-hidden="true" /><span><b>Booked</b> <span>{event.booked}</span></span></div>
    </> : <>
      <div className="cw-wait"><Clock3 size={16} aria-hidden="true" /><span>Waits until {event.wait}</span></div>
      <small className="cw-elsewhere">Booked elsewhere?</small>
    </>}
  </article>;
  return <section id="after-hours" ref={sectionRef} className="sx sx-dark clinic-week" data-with-zaad={enabled} aria-labelledby="clinic-week-title">
    <div className="sx-shell">
      <div className="sx-head"><span className="sx-kicker">AFTER HOURS</span><h2 id="clinic-week-title">YOUR CLINIC CLOSES.<br />PATIENTS{" "}<em>DON'T STOP LOOKING.</em></h2><p>People look for care in the evening, at night and at weekends, exactly when nobody is there to pick up.</p></div>
      <div className="cw-controls"><div className="cw-toggle" role="group" aria-label="Your clinic's week">
        <Button variant="unstyled" size="unstyled" aria-pressed={!enabled} onClick={() => choose(false)}>WITHOUT ZAAD</Button>
        <Button variant="unstyled" size="unstyled" aria-pressed={enabled} onClick={() => choose(true)}>WITH ZAAD</Button>
      </div><div className="cw-legend"><span><i className="cw-open-key" />Open</span><span><i className="cw-closed-key" />Closed</span></div></div>
      <div className="cw-timeline" aria-label="YOUR CLINIC'S WEEK">
        {days.map((day, dayIndex) => <div className="cw-day" key={day}>
          <h3>{day}</h3><div className={`cw-track cw-day-${dayIndex}`}>
            {dayIndex < 6 && <div className="cw-open-band"><span>{dayIndex === 5 ? "9:00–13:00" : "9:00–17:00"}</span></div>}
            {dayIndex === 6 && <span className="cw-closed-label">Closed</span>}
            {enquiries.map((event, index) => event.day === dayIndex ? card(event, index) : null)}
            {enabled && enquiries.map((event, index) => event.appointmentDay === dayIndex ? <i key={index} className={`cw-booking-dot cw-dot-${index} cw-slot-${event.slot}`} aria-hidden="true" /> : null)}
          </div>
        </div>)}
      </div>
      <div className="cw-mobile-list">{enquiries.map(card)}</div>
      <p className="cw-takeaway" aria-live="polite">{enabled ? "Every enquiry outside opening hours gets a text with a booking link within a minute, so patients book while they're still looking." : "Five people wanted an appointment. They all waited, and some will book somewhere else."}</p>
      <Button asChild variant="unstyled" size="unstyled" className="journey-primary"><Link to="/book">BOOK A STRATEGY CALL <ArrowUpRight size={18} /></Link></Button>
    </div>
  </section>;
}