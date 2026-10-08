import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, MessageSquare, Star, X } from "lucide-react";
import { UniBoxSection } from "@/components/journey/SystemSections";
import { StepExplorer } from "@/components/journey/StepExplorer";
import { ProblemGrid } from "@/components/journey/Extras";
import { BookPrompt, CentredHero, FitCheck, GrowthEstimator, Pricing, SpecialtyPicker } from "@/components/journey/MoreSections";
import { Button } from "@/components/ui/button";
import { AdvertsFirst, Faq, FounderSection, GoodEnquiry } from "@/components/journey/NewSections";
import { ApproachSection, FinalCta, SiteFooter } from "@/components/journey/FinalSections";
import { SceneArt } from "@/components/journey/SceneArt";
import { chapters, chapterProgress } from "@/lib/zaad-journey";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";


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


function Index() {
  const [mode, setMode] = useState<"static" | "3d">("static");
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useRef(0);
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMode(reduced.matches ? "static" : "3d");
    update();
    reduced.addEventListener("change",update);
    return () => reduced.removeEventListener("change",update);
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
      setActive(index+3);
      const vh=window.innerHeight;
       sections.forEach((section)=>{
         const r=section.getBoundingClientRect();
         const p=mode==="3d"?Math.max(0,Math.min(1,(vh*.85-r.top)/Math.max(1,r.height*.55))):1;
         const drift=mode==="3d"?Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-vh))):0;
         section.style.setProperty("--p",p.toFixed(3));
         section.style.setProperty("--scene-drift",drift.toFixed(3));
          if(section===first){
            const art=section.querySelector<HTMLElement>(".scene-art");
            const artRect=art?.getBoundingClientRect();
            const heroTravel=mode!=="3d"?0:window.innerWidth>=768
              ?Math.max(0,Math.min(1,(window.scrollY-first.offsetTop)/Math.max(1,first.offsetHeight-vh)))
              :Math.max(0,Math.min(1,(vh-(artRect?.top??vh))/Math.max(1,vh*.85)));
            section.style.setProperty("--hero-travel",heroTravel.toFixed(3));
          }
         section.setAttribute("data-visible",String(r.top<vh&&r.bottom>0));
       });
      sections.forEach((section,i)=>{
        const content=section.querySelector<HTMLElement>(".chapter-content");
        if(!content) return;
        const opacity=i===index ? (local>.60?Math.max(.04,1-(local-.60)/.40):1) : 1;
        content.style.opacity=mode==="3d"?String(opacity):"1";section.querySelectorAll<HTMLElement>(".scene-art,.scene-caption").forEach(el=>{el.style.opacity=mode==="3d"&&window.innerWidth>=768?String(opacity):"1";});
        content.style.transform=mode==="3d"?`translateY(${i===index?Math.max(0,local-.42)*-35:0}px)`:"none";
      });
      root.style.setProperty("--journey-progress",`${(index+local)/Math.max(1,sections.length)*100}%`);
      root.style.setProperty("--foreground-shift",`${travel*-17}px`);
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener("scroll",request,{passive:true});window.addEventListener("resize",request);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",request);window.removeEventListener("resize",request);};
  },[mode]);

  return <main ref={pageRef} className={`journey-page ${mode==="static"?"journey-static":"journey-live"}`} data-mode={mode}>
    <header className="journey-header">
      <a href="#top" aria-label="ZAAD home" className="journey-logo"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day"/></a>
      <nav aria-label="Main navigation" className={menuOpen?"open":""} onClick={()=>setMenuOpen(false)}><a href="#who">Who we help</a><a href="#modules">How it works</a><a href="#unibox">UniBox</a><a href="#pricing">Pricing</a></nav>
      <Button asChild variant="unstyled" size="unstyled" className="journey-call"><Link to="/book">Book a strategy call <ArrowUpRight size={18}/></Link></Button>
      <Button variant="unstyled" size="unstyled" className="journey-menu" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(o=>!o)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</Button>
    </header>
    <nav className="chapter-nav" aria-label="Scenes">{chapters.slice(3,6).map((chapter,k)=>{const i=k+3;return <a key={chapter.id} href={`#${chapter.id}`} aria-label={`Scene ${i}: ${chapter.label}`} aria-current={active===i?"step":undefined}><span className="cn-label">{chapter.label}</span><i/></a>;})}</nav>
        {(()=>{const renderChapter=(chapter:(typeof chapters)[number],i:number)=><section className={`journey-chapter${i===7?" journey-chapter--plain":""}`} id={chapter.id} key={chapter.id} aria-labelledby={`title-${i}`}>
      <div className="chapter-pin">
        <div className={`chapter-content ${i===0?"chapter-hero":""}`}>
          <div className="chapter-eyebrow"><i/>{chapter.label}</div>
          {i===0 ? <><div className="hero-wordmark">ZAAD<span>®</span></div><h1 id={`title-${i}`}>{chapter.title} <em>{chapter.accent}</em></h1></> : <h2 id={`title-${i}`}>{chapter.title}<br/><em>{chapter.accent}</em></h2>}
          <p>{chapter.text}</p>
          {i===0&&<p className="hero-trust">Built for healthcare practices. Your team stays in control of every patient conversation.</p>}
          {chapter.points.length>0&&<ul className="chapter-points">{chapter.points.map(pt=><li key={pt}>{pt}</li>)}</ul>}
          {chapter.why&&<p className="chapter-why"><strong>Why it matters:</strong> {chapter.why}</p>}
          {i===0&&<Button asChild variant="unstyled" size="unstyled" className="journey-text-link"><a href="#system">See how ZAAD works <ArrowDown size={18}/></a></Button>}
          {i===2&&<div className="chapter-booked"><Check size={16}/> Appointment booked</div>}
          {i===4&&<div className="chapter-stars" aria-label="5-star rating">{Array.from({length:5},(_,n)=><Star key={n} size={18} fill="currentColor"/>)}</div>}
          {i===6&&<div className="chapter-tools"><span>Your practice at a glance</span><span><MessageSquare size={16}/> UniBox</span></div>}
          {i===7&&<div className="chapter-actions"><Button asChild variant="unstyled" size="unstyled" className="journey-primary"><Link to="/book">Book a strategy call <ArrowUpRight size={20}/></Link></Button><Button asChild variant="unstyled" size="unstyled" className="journey-text-link"><a href="#system">See how ZAAD works <ArrowRight size={18}/></a></Button></div>}
        </div>
        <SceneArt index={i}/>
        <div className="scene-caption"><span className="caption-marker"/><div><span>{chapter.scene}</span><p>{chapter.detail}</p></div></div>
        <div className="chapter-bottom"><a href={i===7?"#top":(i>=5?"#approach":`#${chapters[i+1]?.id??"top"}`)} aria-label={i===7?"Back to top":"Next section"}>{i===7?"Back to top":""}<ArrowDown size={18}/></a></div>
      </div>
    </section>;
      return <><CentredHero/><SpecialtyPicker/><ProblemGrid/><GoodEnquiry/>{chapters.slice(3,6).map((c,k)=>renderChapter(c,k+3))}<ApproachSection/><StepExplorer/><AdvertsFirst/><section className="sx sx-light book-prompt-band"><div className="sx-shell"><BookPrompt text="Want to see what this looks like for your practice?"/></div></section><UniBoxSection/><GrowthEstimator/><FounderSection/><Pricing/><FitCheck/><Faq/><FinalCta/></>;})()}
    <SiteFooter/>
  </main>;
}
