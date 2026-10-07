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

function Mockup({ i }: { i: number }) {
  const [title, status] = screens[i]!;
  return <div className="px-mock" aria-label={`Example: ${title}`}>
    <div className="px-mock-bar"><span aria-hidden="true"><i /><i /><i /></span>Riverside Dental</div>
    <div className="px-mock-body"><div className="px-mock-card" key={i}>
      <small>Step {num(i)} · {pills[i]}</small>
      <b>{title}</b>
      <p><Check size={16} aria-hidden="true" />{status}</p>
    </div></div>
  </div>;
}

function Journey({ active, onPick }: { active: number; onPick?: (i: number) => void }) {
  return <div className="px-journey">
    <div><h3>One connected patient journey</h3>
      <div className="px-tiles">{pills.map((p, i) => <button type="button" key={p} className="px-tile" data-state={i === active ? "active" : i < active ? "done" : "next"} onClick={() => onPick?.(i)} aria-current={i === active ? "step" : undefined}><span>{num(i)}</span>{p}</button>)}</div>
    </div>
    <div className="px-chart" aria-label={`Patient is ${states[active]}`}>
      <div className="px-bars" aria-hidden="true">{states.map((s, i) => <i key={s} style={{ height: `${30 + i * 12}%` }} data-on={i <= active} />)}</div>
      <span>Patient: <b>{states[active]}</b></span>
    </div>
  </div>;
}

export function StepExplorer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRow = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);
  const [mFill, setMFill] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrapRef.current;
      if (w && w.offsetParent !== null) {
        const r = w.getBoundingClientRect();
        const total = Math.max(1, r.height - (window.innerHeight - 92));
        const p = Math.max(0, Math.min(1, -r.top / total));
        setProg(p);
        setActive(Math.min(5, Math.floor(p * 6)));
      }
      const l = listRef.current;
      if (l && l.offsetParent !== null) {
        const r = l.getBoundingClientRect(), mark = window.innerHeight * 0.6;
        setMFill(Math.max(0, Math.min(1, (mark - r.top) / Math.max(1, r.height))));
      }
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", req, { passive: true }); window.addEventListener("resize", req);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", req); window.removeEventListener("resize", req); };
  }, []);

  useEffect(() => {
    const row = pillRow.current, pill = row?.children[active] as HTMLElement | undefined;
    if (row && pill) row.scrollTo({ left: pill.offsetLeft - row.clientWidth / 2 + pill.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  const pick = (i: number) => {
    const w = wrapRef.current; if (!w) return;
    const total = w.offsetHeight - (window.innerHeight - 92);
    const top = w.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / 6);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const s = steps[active]!;
  return <section id="modules" className="sx-light px" aria-labelledby="modules-title">
    <div className="px-wrap" ref={wrapRef}>
      <div className="px-pin"><div className="px-shell">
        <div className="px-head"><span className="sx-kicker"><i />What ZAAD does for your practice</span><h2 id="modules-title">How we turn attention into <em>booked patients</em></h2><p>Six steps, from the first search to a patient in your chair, and back again for their next visit.</p></div>
        <div className="px-pills" ref={pillRow} role="tablist" aria-label="Steps">{pills.map((p, i) => <button type="button" role="tab" aria-selected={i === active} key={p} className="px-pill" onClick={() => pick(i)}><span>{num(i)}</span>{p}</button>)}</div>
        <div className="px-progress" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(prog, (active + 1) / 6 * 0.999)})` }} /></div>
        <div className="px-cols">
          <div className="px-detail" key={active}>
            <span className="px-step">Step {num(active)}</span>
            <h3>{s.t}</h3><p>{s.d}</p>
            <small>Includes</small>
            <ul>{s.p.map((x, k) => <li key={x} style={{ animationDelay: `${80 + k * 70}ms` }}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
          </div>
          <Mockup i={active} />
        </div>
        <Journey active={active} onPick={pick} />
      </div></div>
    </div>

    <div className="px-mobile sx-shell">
      <div className="px-head"><span className="sx-kicker"><i />What ZAAD does for your practice</span><h2>How we turn attention into <em>booked patients</em></h2><p>Six steps, from the first search to a patient in your chair, and back again for their next visit.</p></div>
      <div className="px-mtrack">
        <span className="px-mline" aria-hidden="true"><i style={{ transform: `scaleY(${mFill})` }} /></span>
        <ol ref={listRef}>{steps.map((st, i) => <li key={st.t} className="px-mcard">
          <span className="px-step">Step {num(i)}</span><h3>{st.t}</h3><p>{st.d}</p>
          <ul>{st.p.map(x => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
          <Mockup i={i} />
        </li>)}</ol>
      </div>
      <Journey active={5} />
    </div>
  </section>;
}
