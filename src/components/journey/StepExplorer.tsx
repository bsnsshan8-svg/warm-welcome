import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { steps } from "./Extras";

const num = (i: number) => String(i + 1).padStart(2, "0");

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
        </div>
        <span className="vx-track" aria-hidden="true"><i style={{ transform: `scaleY(${fill})` }} /></span>
        <div className="vx-right">
          <ol ref={listRef} className="vx-list">{steps.map((st, i) => <li key={st.t} className="vx-card" data-active={i === active}>
            <span className="px-step">Step {num(i)}</span><h3>{st.t}</h3><p>{st.d}</p>
            <ul>{st.p.map(x => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
          </li>)}</ol>
        </div>
      </div>
    </div>
  </section>;
}
