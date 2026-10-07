import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { steps } from "./Extras";

const pills = ["Get found", "Reply to every enquiry", "Follow up until they book", "Recover missed calls", "Turn visits into reviews", "Bring past patients back"];
const screens = [
  ["Emma searches 'dentist near me'", "Found your clinic"],
  ["New message from Emma Wilson", "Replied in 2 minutes"],
  ["Follow-up sent to Emma", "Thursday 3:30 PM booked"],
  ["Missed call from James Carter", "Text sent, he replied"],
  ["Review invitation sent to Sarah", "5-star review received"],
  ["Check-up reminder sent to Maria Lopez", "She booked a visit"],
] as const;
const states = ["Searching", "Asking", "Deciding", "Calling back", "Sharing", "Returning"];
const num = (i: number) => String(i + 1).padStart(2, "0");

function Mockup({ i, className = "" }: { i: number; className?: string }) {
  const [title, status] = screens[i]!;
  return <div className={`px-mock ${className}`} aria-label={`Example: ${title}`}>
    <div className="px-mock-bar"><span aria-hidden="true"><i /><i /><i /></span>Riverside Dental</div>
    <div className="px-mock-body"><div className="px-mock-card" key={i}>
      <small>Step {num(i)} · {pills[i]}</small>
      <b>{title}</b>
      <p><Check size={16} aria-hidden="true" />{status}</p>
    </div></div>
  </div>;
}

function Journey({ active }: { active: number }) {
  return <div className="px-journey">
    <div><h3>One connected patient journey</h3>
      <div className="px-tiles">{pills.map((p, i) => <span key={p} className="px-tile" data-state={i === active ? "active" : i < active ? "done" : "next"}><span>{num(i)}</span>{p}</span>)}</div>
    </div>
    <div className="px-chart" aria-label={`Patient is ${states[active]}`}>
      <div className="px-bars" aria-hidden="true">{states.map((s, i) => <i key={s} style={{ height: `${30 + i * 12}%` }} data-on={i <= active} />)}</div>
      <span>Patient: <b>{states[active]}</b></span>
    </div>
  </div>;
}

export function StepExplorer() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const l = listRef.current; if (!l) return;
      const mid = window.innerHeight / 2;
      const r = l.getBoundingClientRect();
      setFill(Math.max(0, Math.min(1, (mid - r.top) / Math.max(1, r.height))));
      let best = 0, bd = Infinity;
      Array.from(l.children).forEach((c, i) => { const b = c.getBoundingClientRect(); const d = Math.abs(b.top + b.height / 2 - mid); if (d < bd) { bd = d; best = i; } });
      setActive(best);
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", req, { passive: true }); window.addEventListener("resize", req);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", req); window.removeEventListener("resize", req); };
  }, []);

  return <section id="modules" className="sx sx-light px vx" aria-labelledby="modules-title">
    <div className="sx-shell">
      <div className="vx-cols">
        <div className="vx-left">
          <div className="px-head"><span className="sx-kicker"><i />What ZAAD does for your practice</span><h2 id="modules-title">How we turn attention into <em>booked patients</em></h2><p>Six steps, from the first search to a patient in your chair, and back again for their next visit.</p></div>
          <div className="vx-mock-wrap">{screens.map((_, i) => <Mockup key={i} i={i} className={i === active ? "vx-on" : "vx-off"} />)}</div>
        </div>
        <div className="vx-right">
          <span className="vx-line" aria-hidden="true"><i style={{ transform: `scaleY(${fill})` }} /></span>
          <ol ref={listRef} className="vx-list">{steps.map((st, i) => <li key={st.t} className="vx-card" data-active={i === active}>
            <span className="px-step">Step {num(i)}</span><h3>{st.t}</h3><p>{st.d}</p>
            <ul>{st.p.map(x => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
            <Mockup i={i} className="vx-mobile-mock" />
          </li>)}</ol>
        </div>
      </div>
      <div className="vx-journey"><Journey active={active} /></div>
    </div>
  </section>;
}
