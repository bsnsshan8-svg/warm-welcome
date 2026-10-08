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
       <g className="hero-layer hero-layer-search"><g className="core-hover core-search">
        <rect x="27" y="228" width="217" height="52" rx="8" className="f-card s-edge" strokeWidth="2" />
        <circle cx="53" cy="253" r="8" className="s-cyan" strokeWidth="3" fill="none" /><path d="M59 259 l6 6" className="s-cyan" strokeWidth="3" />
        <text x="79" y="260" fontSize="18" className="t-light">A patient searches</text>
       </g></g>
       <g className="hero-layer hero-layer-chat"><g className="core-hover core-chat">
        <rect x="180" y="290" width="196" height="52" rx="8" className="f-card s-edge" strokeWidth="2" />
        <path d="M196 307 h22 v15 h-13 l-6 5 v-5 h-3Z" className="s-coral" strokeWidth="2" fill="none" />
        <text x="230" y="322" fontSize="18" className="t-light">Follow up</text>
       </g></g>
       <g className="hero-layer hero-layer-booking"><g className="core-hover core-booking">
        <rect x="153" y="117" width="103" height="107" rx="8" className="f-card s-edge" strokeWidth="2" />
        <path d="M153 145 h103" className="s-green" strokeWidth="3" /><path d="M178 110 v17 M231 110 v17" className="s-light" strokeWidth="4" strokeLinecap="round" />
        <path d="M188 174 l10 10 l21 -23" className="s-green" strokeWidth="5" fill="none" strokeLinecap="round" />
        <text x="205" y="208" fontSize="18" textAnchor="middle" className="t-light">Booked</text>
       </g></g>
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
  return <Frame label="A missed call sends a text with a booking link; James fills in a short form and books Monday 9:00 AM">
    <g className="ring"><rect x="30" y="18" width="160" height="34" rx="16" className="f-alert" /><text x="110" y="41" fontSize="18" textAnchor="middle" className="t-light t-bold">Missed call</text></g>
    <path d="M110 56 v14 m-5 -5 l5 5 l5 -5" className="s-blue" fill="none" strokeWidth="2" />
    <g className="in" style={v({ "--s": .18 })}>
      <rect x="18" y="76" width="364" height="130" rx="16" className="f-blue" />
      <text x="34" y="103" fontSize="19" className="t-light">Sorry we missed your call at</text>
      <text x="34" y="130" fontSize="19" className="t-light">Riverside Dental. Book a time</text>
      <text x="34" y="157" fontSize="19" className="t-light">that suits you here:</text>
      <rect x="34" y="170" width="238" height="28" rx="8" className="f-light" /><text x="46" y="190" fontSize="19" className="t-dark t-bold">Book your visit →</text>
    </g>
    <path d="M200 210 v14 m-5 -5 l5 5 l5 -5" className="s-blue" fill="none" strokeWidth="2" />
    <g className="in flip" style={v({ "--s": .4 })}>
      <rect x="70" y="230" width="300" height="120" rx="12" className="f-light" />
      <text x="86" y="258" fontSize="19" className="t-dark">Name: James Carter</text>
      <text x="86" y="284" fontSize="19" className="t-dark">Reason: Check-up</text>
      <text x="86" y="310" fontSize="19" className="t-dark">Time: Mon 9:00 AM</text>
      <rect x="260" y="316" width="90" height="28" rx="8" className="f-blue" /><text x="305" y="337" fontSize="19" textAnchor="middle" className="t-light t-bold">Book</text>
    </g>
    <g className="in pop" style={v({ "--s": .62 })}><rect x="214" y="360" width="160" height="34" rx="16" className="f-green" /><text x="294" y="384" fontSize="19" textAnchor="middle" className="t-dark t-bold">Booked ✓</text></g>
  </Frame>;
}

const starPath = (cx: number, cy: number, r: number) => Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * .45 : r; return `${i ? "L" : "M"}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join(" ") + "Z";

function Reviews() {
  return <Frame label="A review request turning into a five-star review card">
    {/* layered background cards for depth */}
    <rect x="80" y="216" width="240" height="120" rx="16" className="f-card s-edge" strokeWidth="2" opacity=".4" transform="translate(0,14) scale(.94)" style={{ transformOrigin: "200px 276px" }} />
    <rect x="80" y="196" width="240" height="120" rx="16" className="f-card s-edge" strokeWidth="2" opacity=".65" transform="translate(0,7) scale(.97)" style={{ transformOrigin: "200px 256px" }} />
    {/* main review card */}
    <g className="in pop" style={v({ "--s": .12 })}>
      <rect x="80" y="170" width="240" height="130" rx="16" className="f-light" />
      <rect x="100" y="192" width="120" height="10" rx="5" className="f-block" />
      <rect x="100" y="212" width="180" height="8" rx="4" className="f-blue-soft" />
      <rect x="100" y="227" width="140" height="8" rx="4" className="f-blue-soft" />
      {[0, 1, 2, 3, 4].map(i => <g key={i}><path d={starPath(112 + i * 26, 262, 11)} className="f-block" /><path d={starPath(112 + i * 26, 262, 11)} className="f-star in pop" style={v({ "--s": .3 + i * .07 })} /></g>)}
      <text x="300" y="268" textAnchor="end" fontSize="12" className="t-dark" opacity=".45">Just now</text>
    </g>
    {/* floating rating badge */}
    <g className="in pop" style={v({ "--s": .5 })}>
      <circle cx="290" cy="118" r="42" className="f-card s-blue" strokeWidth="2" />
      <text x="290" y="126" textAnchor="middle" fontSize="26" className="t-light t-bold">5.0</text>
      <text x="290" y="146" textAnchor="middle" fontSize="12" className="t-star t-bold">RATING</text>
    </g>
    {/* request-sent pill */}
    <g className="in slide" style={v({ "--s": .38 })}>
      <rect x="44" y="84" width="128" height="40" rx="20" className="f-blue" />
      <path d="M100 124 l0 10 l10 -10 Z" className="f-blue" />
      <text x="108" y="109" textAnchor="middle" fontSize="13" className="t-light t-bold">Request sent!</text>
    </g>
  </Frame>;
}

function PastPatients() {
  const nodes = [
    { x: 200, y: 60, label: "Inactive", booked: false, s: .18 },
    { x: 330, y: 130, label: "Booked", booked: true, s: .42 },
    { x: 70, y: 130, label: "", booked: false, s: .3 },
  ];
  return <Frame label="Past patients reconnecting with the clinic and booking again">
    <circle cx="200" cy="200" r="150" className="s-edge" fill="none" strokeWidth="1.5" strokeDasharray="4 8" opacity=".35" />
    {/* rays from hub to each patient, drawn in with scroll progress */}
    {nodes.map((n, i) => <line key={i} x1="200" y1="200" x2={n.x} y2={n.y} className="s-blue in" strokeWidth="2" strokeDasharray="5 6" opacity=".5" style={v({ "--s": n.s - .08 })} />)}
    {/* central clinic hub */}
    <g className="in pop" style={v({ "--s": .05 })}>
      <rect x="162" y="162" width="76" height="76" rx="20" className="f-blue" />
      <path d="M188 200 h24 M200 188 v24" className="s-light" strokeWidth="5" strokeLinecap="round" />
    </g>
    {nodes.map((n, i) => <g key={i}>
      <g className="faded"><Avatar x={n.x} y={n.y} r={24} /></g>
      <g className="in pop" style={v({ "--s": n.s })}>
        {n.booked
          ? <><circle cx={n.x} cy={n.y} r="24" className="f-green" /><path d={`M${n.x - 7} ${n.y} l5 5 l9 -10`} className="s-dark" strokeWidth="3.5" fill="none" strokeLinecap="round" /></>
          : <Avatar x={n.x} y={n.y} r={24} className="lit" />}
        {n.label && <text x={n.x} y={n.y + 44} textAnchor="middle" fontSize="12" className={n.booked ? "t-green t-bold" : "t-muted"}>{n.label}</text>}
      </g>
      {/* invitation flying from hub to patient */}
      <g className="fly" style={v({ "--s": n.s - .1, "--tx": n.x - 200, "--ty": n.y - 200 })}><rect x="186" y="190" width="28" height="20" rx="4" className="f-light" /><path d="M187 192 l13 10 l13 -10" className="s-blue" strokeWidth="2" fill="none" /></g>
    </g>)}
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
