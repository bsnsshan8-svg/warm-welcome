import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { steps } from "./Extras";

const num = (i: number) => String(i + 1).padStart(2, "0");
const HEADER = 72;

const mocks = [
  ["Emma searches 'dentist near me'", "Found your clinic"],
  ["New message from Emma Wilson", "Replied in 2 minutes"],
  ["Follow-up sent to Emma", "Thursday 3:30 PM booked"],
  ["Missed call from James Carter", "Text sent, he replied"],
  ["Review invitation sent to Sarah", "5-star review received"],
  ["Check-up reminder sent to Maria Lopez", "She booked a visit"],
];

function Card({ i, className, hidden }: { i: number; className?: string; hidden?: boolean }) {
  const st = steps[i];
  return <article className={`vx-card ${className ?? ""}`} data-active="true" aria-hidden={hidden || undefined}>
    <span className="px-step">Step {num(i)}</span><h3>{st.t}</h3><p>{st.d}</p>
    <ul>{st.p.map(x => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
    <div className="vx-strip"><span className="vx-strip-name">Riverside Dental</span><span className="vx-strip-ev">{mocks[i][0]}</span><b><Check size={14} aria-hidden="true" />{mocks[i][1]}</b></div>
  </article>;
}

export function StepExplorer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<{ i: number; dir: number } | null>(null);
  const [fill, setFill] = useState(0);
  const [mfill, setMfill] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const w = wrapRef.current;
      if (w && w.offsetParent !== null && getComputedStyle(w).display !== "none") {
        const r = w.getBoundingClientRect();
        const total = Math.max(1, r.height - (window.innerHeight - HEADER));
        const p = Math.max(0, Math.min(1, (HEADER - r.top) / total));
        setFill(p);
        const idx = Math.min(5, Math.floor(p * 6));
        if (idx !== activeRef.current) {
          setPrev({ i: activeRef.current, dir: idx > activeRef.current ? 1 : -1 });
          activeRef.current = idx; setActive(idx);
        }
      }
      const l = listRef.current;
      if (l) { const mid = window.innerHeight / 2; const r = l.getBoundingClientRect(); setMfill(Math.max(0, Math.min(1, (mid - r.top) / Math.max(1, r.height)))); }
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", req, { passive: true }); window.addEventListener("resize", req);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", req); window.removeEventListener("resize", req); };
  }, []);

  useEffect(() => { if (!prev) return; const t = setTimeout(() => setPrev(null), 260); return () => clearTimeout(t); }, [prev]);

  const go = (i: number) => {
    const w = wrapRef.current; if (!w) return;
    const total = w.offsetHeight - (window.innerHeight - HEADER);
    const top = w.getBoundingClientRect().top + window.scrollY - HEADER + total * ((i + 0.5) / 6);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const dir = prev?.dir ?? 1;
  const head = (id?: string) => <div className="px-head"><span className="sx-kicker"><i />What ZAAD does for your practice</span><h2 id={id}>How we turn attention into <em>booked patients</em></h2><p>Six steps, from the first search to a patient in your chair, and back again for their next visit.</p></div>;

  return <section id="modules" className="sx sx-light px vx" aria-labelledby="modules-title">
    <div ref={wrapRef} className="vx-pin-wrap">
      <div className="vx-pin">
        <div className="sx-shell vx-pin-grid">
          <div className="vx-pin-left">
            {head("modules-title")}
            <div className="vx-nav">
              <span className="vx-nav-track" aria-hidden="true"><i style={{ transform: `scaleY(${fill})` }} /></span>
              <ol>{steps.map((st, i) => <li key={st.t} data-state={i === active ? "active" : i < active ? "done" : "next"}>
                <button type="button" onClick={() => go(i)} aria-current={i === active ? "step" : undefined}>
                  <span className="vx-dot" aria-hidden="true">{i < active && <Check size={12} />}</span>
                  <span className="vx-n">{num(i)}</span>{st.t}
                </button>
              </li>)}</ol>
            </div>
          </div>
          <div className="vx-stage" aria-live="polite">
            {prev && <Card key={`p${prev.i}-${active}`} i={prev.i} hidden className={dir > 0 ? "vx-out-up" : "vx-out-down"} />}
            <Card key={`a${active}`} i={active} className={prev ? (dir > 0 ? "vx-in-up" : "vx-in-down") : ""} />
            {active < 5 && <div className="vx-peek" aria-hidden="true" />}
          </div>
        </div>
      </div>
    </div>

    <div className="sx-shell vx-mobile">
      <div className="vx-cols">
        <div className="vx-left">{head()}</div>
        <span className="vx-track" aria-hidden="true"><i style={{ transform: `scaleY(${mfill})` }} /></span>
        <div className="vx-right">
          <ol ref={listRef} className="vx-list">{steps.map((st, i) => <li key={st.t} className="vx-card" data-active="false">
            <span className="px-step">Step {num(i)}</span><h3>{st.t}</h3><p>{st.d}</p>
            <ul>{st.p.map(x => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>
          </li>)}</ol>
        </div>
      </div>
    </div>
  </section>;
}
