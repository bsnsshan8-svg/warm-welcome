import { createFileRoute } from "@tanstack/react-router";
import { Component, Suspense, lazy, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, MessageSquare, Star, X } from "lucide-react";
import { CommandCenterSection, GrowthSection, MissedCallSection, SystemModules, UniBoxSection } from "@/components/journey/SystemSections";
import { ProblemGrid, ProcessSteps, ResultsStrip, StatsBand } from "@/components/journey/Extras";
import { Button } from "@/components/ui/button";
import { StaticWorld } from "@/components/journey/StaticWorld";
import { chapters, chapterProgress, type JourneyPalette } from "@/lib/zaad-journey";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";

const JourneyWorld = lazy(() => import("@/components/journey/JourneyWorld"));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ZAAD — More New Patients for Healthcare Practices" },
      { name: "description", content: "ZAAD brings new patients to your practice, replies to every enquiry, books the appointment, and brings past patients back." },
      { property: "og:title", content: "ZAAD — More New Patients for Healthcare Practices" },
      { property: "og:description", content: "ZAAD brings new patients to your practice, replies to every enquiry, books the appointment, and brings past patients back." },
      { name: "twitter:title", content: "ZAAD — More New Patients for Healthcare Practices" },
      { name: "twitter:description", content: "ZAAD brings new patients to your practice, replies to every enquiry, books the appointment, and brings past patients back." },
      { name: "author", content: "ZAAD" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hello-hub-host.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://hello-hub-host.lovable.app/" }],
  }),
});


class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override componentDidCatch() { this.props.onFailure(); }
  override render() { return this.state.failed ? null : this.props.children; }
}

function Index() {
  const [mode, setMode] = useState<"static" | "3d">("static");
  const [mobile, setMobile] = useState(false);
  const [palette, setPalette] = useState<JourneyPalette | null>(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useRef(0);
  const pageRef = useRef<HTMLElement>(null);
  const useStatic = useCallback(() => setMode("static"), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 700px)");
    const style = getComputedStyle(document.documentElement);
    const token = (name: string) => style.getPropertyValue(name).trim();
    setPalette({background:token("--journey-bg"),surface:token("--journey-surface"),edge:token("--journey-edge"),accent:token("--journey-blue"),light:token("--journey-light"),muted:token("--journey-muted"),booked:token("--journey-booked")});
    let supported = false;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      supported = Boolean(gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { supported = false; }
    const update = () => { setMobile(narrow.matches); setMode(!reduced.matches && supported ? "3d" : "static"); };
    update();
    reduced.addEventListener("change",update); narrow.addEventListener("change",update);
    return () => { reduced.removeEventListener("change",update); narrow.removeEventListener("change",update); };
  }, []);

  useEffect(() => {
    const root=pageRef.current;
    if(!root) return;
    const sections=Array.from(root.querySelectorAll<HTMLElement>(".journey-chapter"));
    let frame=0;
    const update=()=>{
      frame=0;
      const first=sections[0];
      if(!first) return;
      const {index,local,travel}=chapterProgress(window.scrollY,sections.map(s=>s.offsetTop),first.offsetHeight);
      progress.current=travel;
      setActive(index);
      sections.forEach((section,i)=>{
        const content=section.querySelector<HTMLElement>(".chapter-content");
        if(!content) return;
        const opacity=i===index ? (local>.60?Math.max(.04,1-(local-.60)/.40):1) : 1;
        content.style.opacity=mode==="3d"?String(opacity):"1";
        content.style.transform=mode==="3d"?`translateY(${i===index?Math.max(0,local-.42)*-35:0}px)`:"none";
      });
      root.style.setProperty("--journey-progress",`${(index+local)/7*100}%`);
      root.style.setProperty("--foreground-shift",`${travel*-17}px`);
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener("scroll",request,{passive:true});window.addEventListener("resize",request);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",request);window.removeEventListener("resize",request);};
  },[mode]);

  return <main ref={pageRef} className={`journey-page ${mode==="static"?"journey-static":"journey-live"}`} data-mode={mode}>
    <div className="world-layer" aria-hidden="true">
      {mode==="3d"&&palette&&<SceneBoundary onFailure={useStatic}><Suspense fallback={<StaticWorld index={active}/>}><JourneyWorld progress={progress} mobile={mobile} palette={palette} onFailure={useStatic}/></Suspense></SceneBoundary>}
      {mode==="static"&&<StaticWorld index={active}/>}
    </div>
    <div className="world-scrim" aria-hidden="true"/>
    <div className="foreground-frame" aria-hidden="true"><i/><i/></div>
    <header className="journey-header">
      <a href="#top" aria-label="ZAAD home" className="journey-logo"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day"/></a>
      <nav aria-label="Main navigation" className={menuOpen?"open":""} onClick={()=>setMenuOpen(false)}><a href="#system">The system</a><a href="#engine">Patient flow</a><a href="#command">Command center</a><a href="#unibox">UniBox</a></nav>
      <Button asChild variant="unstyled" size="unstyled" className="journey-call"><a href="#contact">Book a strategy call <ArrowUpRight size={18}/></a></Button>
      <Button variant="unstyled" size="unstyled" className="journey-menu" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(o=>!o)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</Button>
    </header>
    <nav className="chapter-nav" aria-label="Chapters">{chapters.map((chapter,i)=><Button key={chapter.id} asChild variant="unstyled" size="unstyled"><a href={`#${chapter.id}`} aria-label={`Chapter ${i+1}: ${chapter.label}`} aria-current={active===i?"step":undefined}><i/></a></Button>)}</nav>
        {(()=>{const renderChapter=(chapter:(typeof chapters)[number],i:number)=><section className="journey-chapter" id={chapter.id} key={chapter.id} aria-labelledby={`title-${i}`}>
      <div className="chapter-pin">
        <div className={`chapter-content ${i===0?"chapter-hero":""}`}>
          <div className="chapter-eyebrow"><i/>{chapter.label}</div>
          {i===0 ? <><div className="hero-wordmark">ZAAD<span>®</span></div><h1 id={`title-${i}`}>{chapter.title} <em>{chapter.accent}</em></h1></> : <h2 id={`title-${i}`}>{chapter.title}<br/><em>{chapter.accent}</em></h2>}
          <p>{chapter.text}</p>
          {i===0&&<p className="hero-trust">Built for healthcare practices. Your team stays in control of every patient conversation.</p>}
          {chapter.points.length>0&&<ul className="chapter-points">{chapter.points.map(pt=><li key={pt}>{pt}</li>)}</ul>}
          {i===0&&<Button asChild variant="unstyled" size="unstyled" className="journey-text-link"><a href="#system">See how ZAAD works <ArrowDown size={18}/></a></Button>}
          {i===2&&<div className="chapter-booked"><Check size={16}/> Appointment booked</div>}
          {i===4&&<div className="chapter-stars" aria-label="5-star rating">{Array.from({length:5},(_,n)=><Star key={n} size={18} fill="currentColor"/>)}</div>}
          {i===6&&<div className="chapter-tools"><span>Your practice at a glance</span><span><MessageSquare size={16}/> UniBox</span></div>}
          {i===7&&<div className="chapter-actions"><Button asChild variant="unstyled" size="unstyled" className="journey-primary"><a href="mailto:hello@zaad.health">Book a strategy call <ArrowUpRight size={20}/></a></Button><Button asChild variant="unstyled" size="unstyled" className="journey-text-link"><a href="#system">See how ZAAD works <ArrowRight size={18}/></a></Button></div>}
        </div>
        <div className="scene-caption"><span className="caption-marker"/><div><span>{chapter.scene}</span><p>{chapter.detail}</p></div></div>
        <div className="chapter-bottom"><a href={i===7?"#top":`#${chapters[i+1]?.id??"top"}`} aria-label={i===7?"Back to top":"Next section"}>{i===7?"Back to top":""}<ArrowDown size={18}/></a></div>
      </div>
    </section>;
      return <>{renderChapter(chapters[0],0)}<ResultsStrip/><ProblemGrid/>{chapters.slice(1,7).map((c,k)=>renderChapter(c,k+1))}<ProcessSteps/><SystemModules/><MissedCallSection/><GrowthSection/><CommandCenterSection/><UniBoxSection/><StatsBand/>{renderChapter(chapters[7],7)}</>;})()}
    <footer className="journey-footer"><a href="#top" aria-label="ZAAD home"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day"/></a><span>A steady flow of new patients for healthcare practices.</span><small>© 2026 ZAAD. Built for healthcare practices.</small></footer>
  </main>;
}
