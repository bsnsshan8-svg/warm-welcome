import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { steps } from "./Extras";

const num = (i: number) => String(i + 1).padStart(2, "0");

const mocks = [
  ["Emma searches 'dentist near me'", "Found your clinic"],
  ["New message from Emma Wilson", "Replied in 2 minutes"],
  ["Follow-up sent to Emma", "Thursday 3:30 PM booked"],
  ["Missed call from James Carter", "Text sent, he replied"],
  ["Reminder sent to Emma", "Confirmed for Thursday 3:30 PM"],
  ["Review invitation sent to Sarah", "5-star review received"],
  ["Check-up reminder sent to Maria Lopez", "She booked a visit"],
];

function StepCard({ i, active }: { i: number; active: boolean }) {
  const st = steps[i]!;
  return (
    <article className="vx-card" data-active={active}>
      <span className="px-step">Step {num(i)}</span>
      <h3>{st.t}</h3>
      <p>{st.d}</p>
      <ul>{st.p.map(x => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
      <div className="vx-strip">
        <span className="vx-strip-name">Riverside Dental</span>
        <span className="vx-strip-ev">{mocks[i]![0]}</span>
        <b><Check size={14} aria-hidden="true" />{mocks[i]![1]}</b>
      </div>
    </article>
  );
}

export function StepExplorer() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const l = listRef.current;
      if (!l) return;
      const r = l.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      setFill(Math.max(0, Math.min(1, (mid - r.top) / Math.max(1, r.height))));
      const items = Array.from(l.children) as HTMLElement[];
      let best = 0, bestDist = Infinity;
      items.forEach((el, i) => {
        const c = el.getBoundingClientRect();
        const d = Math.abs(c.top + c.height / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", req); window.removeEventListener("resize", req); };
  }, []);

  const go = (i: number) => {
    const l = listRef.current;
    const el = l?.children[i] as HTMLElement | undefined;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + el.offsetHeight / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="modules" className="sx sx-light px vx" aria-labelledby="modules-title">
      <div className="sx-shell vx-cols">
        <div className="vx-left">
          <div className="vx-left-sticky">
            <div className="px-head">
              <span className="sx-kicker"><i />What ZAAD does for your practice</span>
              <h2 id="modules-title">How we turn attention into <em>booked patients</em></h2>
              <p>Seven steps, from the first search to a patient in your chair, and back again for their next visit.</p>
            </div>
            <div className="vx-nav">
              <ol>{steps.map((st, i) => (
                <li key={st.t} data-state={i === active ? "active" : i < active ? "done" : "next"}>
                  <button type="button" onClick={() => go(i)} aria-current={i === active ? "step" : undefined}>
                    <span className="vx-dot" aria-hidden="true">{i < active && <Check size={12} />}</span>
                    <span className="vx-n">{num(i)}</span>{st.t}
                  </button>
                </li>
              ))}</ol>
            </div>
          </div>
        </div>
        <div className="vx-right">
          <span className="vx-track" aria-hidden="true"><i style={{ transform: `scaleY(${fill})` }} /></span>
          <ol ref={listRef} className="vx-list">
            {steps.map((st, i) => <li key={st.t}><StepCard i={i} active={i === active} /></li>)}
          </ol>
          <div className="why-box"><b>Why this matters</b><p>Most practices lose patients between steps, not at the start. Fixing the gaps often fills more appointments than spending more on adverts.</p></div>
        </div>
      </div>
    </section>
  );
}
