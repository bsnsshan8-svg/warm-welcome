import { createFileRoute, Link } from "@tanstack/react-router";
import { LeakCalculator } from "@/components/journey/LeakCalculator";
import { UniBoxSection } from "@/components/journey/SystemSections";
import { StepExplorer } from "@/components/journey/StepExplorer";
import { ProblemGrid } from "@/components/journey/Extras";
import { CentredHero, Pricing, SpecialtyPicker } from "@/components/journey/MoreSections";
import { Faq } from "@/components/journey/NewSections";
import { FinalCta, SiteFooter } from "@/components/journey/FinalSections";
import { SiteHeader } from "@/components/journey/SiteHeader";
import { HomeMotion } from "@/components/journey/HomeMotion";

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
      { property: "og:url", content: "https://zeroapplesaday.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zeroapplesaday.com/" }],
  }),
});


function Index() {
  return <main className="journey-page journey-live">
    <HomeMotion />
    <SiteHeader />
    <CentredHero />
    <section id="estimator" className="calc-home" aria-labelledby="calc-home-title">
      <div className="calc-shell calc-home-head"><h2 id="calc-home-title">See what your clinic's leaks cost you <em>each month.</em></h2><p>Two minutes, your own numbers. Then get a free audit of your clinic.</p></div>
      <LeakCalculator />
    </section>
    <SpecialtyPicker /><ProblemGrid />
    <StepExplorer />
    <div className="sx sx-light hiw-link-wrap"><Link to="/how-it-works" className="hiw-link">See how it works in a real clinic week →</Link></div>
    
    <UniBoxSection /><Pricing /><Faq /><FinalCta /><SiteFooter />
  </main>;
}
