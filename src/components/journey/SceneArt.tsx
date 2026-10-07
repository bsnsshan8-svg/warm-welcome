import type { CSSProperties, ReactNode } from "react";

/* Per-scene illustrations. Each reads the inherited CSS variable --p (0..1 scroll progress
   through its scene) and animates only opacity and transform. */
type V = Record<string, string | number>;
const v = (o: V) => o as CSSProperties;

function Tick({ values, x, y, s, w, size = 22, className = "t-num", anchor = "start" }: { values: string[]; x: number; y: number; s: number; w: number; size?: number; className?: string; anchor?: "start" | "middle" | "end" }) {
  return <>{values.map((val, j) => <text key={j} x={x} y={y} fontSize={size} textAnchor={anchor} className={`${className} tick`} style={v({ "--a": j === 0 ? -1 : s + j * w, "--b": j === values.length - 1 ? 9 : s + (j + 1) * w })}>{val}</text>)}</>;
}

function Avatar({ x, y, r = 14, className = "" }: { x: number; y: number; r?: number; className?: string }) {
  return <g className={className}><circle cx={x} cy={y} r={r} className="f-avatar" /><circle cx={x} cy={y - r * .25} r={r * .34} className="f-face" /><path d={`M${x - r * .55} ${y + r * .62} a${r * .55} ${r * .45} 0 0 1 ${r * 1.1} 0`} className="f-face" /></g>;
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return <svg viewBox="0 0 400 400" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
    <defs><radialGradient id="sa-glow"><stop offset="0" stopColor="var(--journey-blue)" stopOpacity=".38" /><stop offset="1" stopColor="var(--journey-blue)" stopOpacity="0" /></radialGradient></defs>
    <circle cx="200" cy="200" r="190" fill="url(#sa-glow)" />
    {children}
  </svg>;
}

function Hero() {
  return <Frame label="A floating apple-shaped patient journey from search to conversation, booking and review">
    <g className="core-depth">
      <path d="M200 92 C170 70 118 80 92 119 C59 166 84 248 126 300 C151 332 178 337 200 325 C226 340 251 329 275 300 C321 249 342 173 313 123 C289 81 238 75 200 92Z" className="core-outline" />
      <path d="M205 66 C212 37 237 27 257 33 C247 57 229 69 205 66Z" className="f-cyan core-leaf" />
      <path d="M199 90 Q193 65 202 48" className="s-light" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g className="core-segments" fill="none" strokeWidth="9" strokeLinecap="round">
        <path d="M198 97 C153 73 111 95 94 140" className="segment-blue" />
        <path d="M86 163 C79 202 95 243 117 270" className="segment-cyan" />
        <path d="M132 290 C158 325 182 330 200 317" className="segment-gold" />
        <path d="M216 323 C248 327 275 294 292 260" className="segment-green" />
        <path d="M304 239 C324 191 326 154 309 125" className="segment-coral" />
        <path d="M295 105 C269 78 238 80 219 92" className="segment-blue" />
      </g>
      <g className="core-node core-node-one"><Avatar x={118} y={108} r={24} className="lit" /></g>
      <g className="core-node core-node-two"><Avatar x={313} y={216} r={21} className="mint-avatar" /></g>
      <g className="core-node core-node-three"><Avatar x={192} y={325} r={25} className="coral-avatar" /></g>
    </g>
    <g className="core-front">
      <g className="core-hover core-search">
        <rect x="27" y="162" width="217" height="52" rx="8" className="f-card s-edge" strokeWidth="2" />
        <circle cx="53" cy="187" r="8" className="s-cyan" strokeWidth="3" fill="none" /><path d="M59 193 l6 6" className="s-cyan" strokeWidth="3" />
        <text x="79" y="194" fontSize="18" className="t-light">A patient searches</text>
      </g>
      <g className="core-hover core-chat">
        <rect x="180" y="248" width="196" height="52" rx="8" className="f-card s-edge" strokeWidth="2" />
        <path d="M196 265 h22 v15 h-13 l-6 5 v-5 h-3Z" className="s-coral" strokeWidth="2" fill="none" />
        <text x="230" y="280" fontSize="18" className="t-light">Follow up</text>
      </g>
      <g className="core-hover core-booking">
        <rect x="153" y="117" width="103" height="107" rx="8" className="f-card s-edge" strokeWidth="2" />
        <path d="M153 145 h103" className="s-green" strokeWidth="3" /><path d="M178 110 v17 M231 110 v17" className="s-light" strokeWidth="4" strokeLinecap="round" />
        <path d="M188 174 l10 10 l21 -23" className="s-green" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="205" y="208" fontSize="18" textAnchor="middle" className="t-light">Booked</text>
      </g>
    </g>
  </Frame>;
}

function Map() {
  const bubbles = [{ x: 22, y: 60, t: "dentist near me", s: .08 }, { x: 228, y: 96, t: "clinic open now", s: .24 }, { x: 40, y: 318, t: "check-up nearby", s: .4 }];
  return <Frame label="A neighbourhood map with a clinic pin and local searches">
    <rect x="30" y="40" width="340" height="320" rx="24" className="f-card" />
    {[[60, 70, 90, 70], [170, 70, 70, 110], [260, 70, 80, 60], [60, 160, 90, 110], [260, 150, 80, 120], [60, 290, 140, 50], [220, 290, 120, 50]].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="10" className="f-block" />)}
    {bubbles.map((b, i) => <line key={i} x1={b.x + 75} y1={b.y + 18} x2="200" y2="225" className="s-blue in" strokeWidth="2" strokeDasharray="5 6" style={v({ "--s": b.s + .1 })} />)}
    <circle cx="200" cy="232" r="22" className="f-blue pulse" />
    <path d="M200 252 C 178 226 176 212 176 204 a24 24 0 0 1 48 0 c0 8 -2 22 -24 48z" className="f-blue" />
    <path d="M193 204 h14 M200 197 v14" className="s-light" strokeWidth="4" strokeLinecap="round" />
    {bubbles.map((b, i) => <g key={i} className="in" style={v({ "--s": b.s })}><rect x={b.x} y={b.y} width="150" height="36" rx="18" className="f-light" /><text x={b.x + 75} y={b.y + 23} fontSize="15" textAnchor="middle" className="t-dark">{b.t}</text></g>)}
  </Frame>;
}

function FollowUp() {
  return <Frame label="A phone conversation ending with a booked appointment">
    <rect x="70" y="20" width="260" height="360" rx="30" className="f-card s-edge" strokeWidth="2" />
    <rect x="170" y="34" width="60" height="8" rx="4" className="f-block" />
    <g className="in" style={v({ "--s": .05 })}><rect x="86" y="64" width="186" height="48" rx="14" className="f-edge" /><text x="98" y="85" fontSize="14" className="t-light">Do you have anything</text><text x="98" y="102" fontSize="14" className="t-light">this week?</text></g>
    <g className="in" style={v({ "--s": .2 })}><rect x="128" y="124" width="186" height="48" rx="14" className="f-blue" /><text x="140" y="145" fontSize="14" className="t-light">Yes! Would Thursday</text><text x="140" y="162" fontSize="14" className="t-light">at 3:30 PM work?</text></g>
    <g className="in" style={v({ "--s": .35 })}><rect x="86" y="184" width="150" height="34" rx="14" className="f-edge" /><text x="98" y="206" fontSize="14" className="t-light">Perfect, thanks</text></g>
    <g className="in" style={v({ "--s": .5 })}>
      <g className="out flip" style={v({ "--s": .68 })}><rect x="118" y="240" width="164" height="110" rx="16" className="f-light" /><rect x="118" y="240" width="164" height="30" rx="16" className="f-blue" /><text x="200" y="261" fontSize="14" textAnchor="middle" className="t-light">Calendar</text><text x="200" y="314" fontSize="22" textAnchor="middle" className="t-dark t-bold">Thursday</text></g>
      <g className="in flip" style={v({ "--s": .68 })}><rect x="118" y="240" width="164" height="110" rx="16" className="f-light" /><rect x="118" y="240" width="164" height="30" rx="16" className="f-green" /><text x="200" y="261" fontSize="14" textAnchor="middle" className="t-dark">Booked</text><text x="200" y="302" fontSize="18" textAnchor="middle" className="t-dark t-bold">Thursday 3:30 PM</text><circle cx="200" cy="328" r="12" className="f-green" /><path d="M194 328 l4 4 l8 -8" className="s-dark" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
    </g>
  </Frame>;
}

function Missed() {
  return <Frame label="A missed call turning into a text conversation and a booking">
    <g className="ring"><circle cx="200" cy="105" r="52" className="f-card s-edge" strokeWidth="2" /><path d="M182 88 c-4 18 14 40 34 36 l6 -10 l-12 -8 l-6 5 c-8 -4 -12 -10 -14 -16 l5 -6 l-8 -12z" className="f-light" /></g>
    <g className="out" style={v({ "--s": .62 })}><rect x="226" y="56" width="128" height="32" rx="16" className="f-alert" /><text x="290" y="77" fontSize="14" textAnchor="middle" className="t-light t-bold">Missed call</text></g>
    <g className="in pop" style={v({ "--s": .62 })}><rect x="226" y="56" width="128" height="32" rx="16" className="f-green" /><text x="290" y="77" fontSize="14" textAnchor="middle" className="t-dark t-bold">Booked ✓</text></g>
    <g className="in" style={v({ "--s": .18 })}><rect x="40" y="190" width="250" height="52" rx="16" className="f-blue" /><text x="56" y="212" fontSize="14" className="t-light">Sorry we missed your call.</text><text x="56" y="230" fontSize="14" className="t-light">How can we help?</text></g>
    <g className="in" style={v({ "--s": .38 })}><rect x="150" y="256" width="210" height="36" rx="16" className="f-edge" /><text x="166" y="279" fontSize="14" className="t-light">I'd like a check-up.</text></g>
    <g className="in" style={v({ "--s": .5 })}><rect x="40" y="306" width="190" height="36" rx="16" className="f-blue" /><text x="56" y="329" fontSize="14" className="t-light">Monday 9:00 AM?</text></g>
  </Frame>;
}

const starPath = (cx: number, cy: number, r: number) => Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * .45 : r; return `${i ? "L" : "M"}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join(" ") + "Z";

function Reviews() {
  return <Frame label="Five stars filling in with review cards stacking up">
    {[0, 1, 2].map(i => <g key={i} className="in" style={v({ "--s": .05 + i * .12 })}><rect x={70 + i * 10} y={250 - i * 34} width={260 - i * 20} height="80" rx="16" className={i === 2 ? "f-light" : "f-card s-edge"} strokeWidth="2" />{i === 2 && <><rect x="110" y="200" width="120" height="10" rx="5" className="f-block" /><rect x="110" y="220" width="170" height="10" rx="5" className="f-blue-soft" /></>}</g>)}
    {[0, 1, 2, 3, 4].map(i => <g key={i}><path d={starPath(96 + i * 52, 120, 22)} className="f-block" /><path d={starPath(96 + i * 52, 120, 22)} className="f-star in pop" style={v({ "--s": .3 + i * .08 })} /></g>)}
    <Tick values={["1.0", "2.0", "3.0", "4.0", "5.0"]} x={200} y={74} s={.3} w={.08} size={40} anchor="middle" className="t-light t-cond" />
  </Frame>;
}

function PastPatients() {
  const ring = Array.from({ length: 8 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 4; return { x: 200 + Math.cos(a) * 140, y: 200 + Math.sin(a) * 140 }; });
  return <Frame label="Past patients lighting up as invitations reach them">
    <circle cx="200" cy="200" r="140" className="s-edge" fill="none" strokeWidth="2" strokeDasharray="4 8" />
    <rect x="160" y="160" width="80" height="80" rx="20" className="f-blue" />
    <path d="M190 200 h20 M200 190 v20" className="s-light" strokeWidth="6" strokeLinecap="round" />
    {ring.map((pt, i) => { const s = .08 + i * .1; return <g key={i}>
      <g className="faded"><Avatar x={pt.x} y={pt.y} r={22} /></g>
      <g className="in" style={v({ "--s": s + .1 })}><Avatar x={pt.x} y={pt.y} r={22} className="lit" /></g>
      <g className="fly" style={v({ "--s": s, "--tx": pt.x - 200, "--ty": pt.y - 200 })}><rect x="186" y="190" width="28" height="20" rx="4" className="f-light" /><path d="M187 192 l13 10 l13 -10" className="s-blue" strokeWidth="2" fill="none" /></g>
    </g>; })}
  </Frame>;
}

function Glance() {
  const rows: [string[], string][] = [[["0", "6", "12"], "new patients"], [["0", "4", "8"], "appointments today"], [["0", "1", "3"], "calls recovered"], [["0", "2", "4"], "new reviews"]];
  return <Frame label="An upright phone showing today's practice summary">
    <rect x="80" y="16" width="240" height="368" rx="32" className="f-card s-edge" strokeWidth="2" />
    <rect x="170" y="30" width="60" height="8" rx="4" className="f-block" />
    <text x="100" y="76" fontSize="14" className="t-muted">Good morning</text>
    <text x="100" y="98" fontSize="17" className="t-light t-bold">Your week so far</text>
    {rows.map(([vals, label], i) => { const y = 120 + i * 62; const s = .08 + i * .14; return <g key={label} className="in slide" style={v({ "--s": s })}>
      <rect x="96" y={y} width="208" height="50" rx="12" className={i === 1 ? "f-green-soft" : "f-edge"} />
      <Tick values={vals} x={112} y={y + 33} s={s} w={.05} size={24} className="t-light t-cond" />
      <text x="150" y={y + 31} fontSize="13" className="t-light">{label}</text>
    </g>; })}
  </Frame>;
}

function Contact() {
  return <Frame label="A full calendar with booked visits">
    <rect x="50" y="60" width="300" height="280" rx="24" className="f-card s-edge" strokeWidth="2" />
    <rect x="50" y="60" width="300" height="50" rx="24" className="f-blue" />
    <text x="200" y="92" fontSize="17" textAnchor="middle" className="t-light t-bold">This week</text>
    {Array.from({ length: 15 }, (_, i) => { const x = 72 + (i % 5) * 54, y = 128 + Math.floor(i / 5) * 66; return <g key={i}><rect x={x} y={y} width="44" height="52" rx="10" className="f-edge" /><g className="in pop" style={v({ "--s": .05 + i * .04 })}><rect x={x} y={y} width="44" height="52" rx="10" className="f-green-soft" /><path d={`M${x + 14} ${y + 27} l6 6 l11 -12`} className="s-green" strokeWidth="3" fill="none" strokeLinecap="round" /></g></g>; })}
  </Frame>;
}

const scenes = [Hero, Map, FollowUp, Missed, Reviews, PastPatients, Glance, Contact];

export function SceneArt({ index }: { index: number }) {
  const S = scenes[index] ?? Hero;
  return <div className={`scene-art scene-art-${index}`}><div className="scene-float"><S /></div></div>;
}
