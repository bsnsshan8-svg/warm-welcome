import { createFileRoute } from "@tanstack/react-router";
import { UniBoxSection } from "@/components/journey/SystemSections";
import { StepExplorer } from "@/components/journey/StepExplorer";
import { ProblemGrid } from "@/components/journey/Extras";
import { BookPrompt, CentredHero, FitCheck, GrowthEstimator, Pricing, SpecialtyPicker } from "@/components/journey/MoreSections";
import { AdvertsFirst, Faq, FounderSection, GoodEnquiry } from "@/components/journey/NewSections";
import { ApproachSection, FinalCta, SiteFooter } from "@/components/journey/FinalSections";
import { MomentsSection } from "@/components/journey/MomentsSection";
import { SiteHeader } from "@/components/journey/SiteHeader";

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
  return <main className="journey-page journey-live">
    <SiteHeader />
    <CentredHero /><SpecialtyPicker /><ProblemGrid /><GoodEnquiry />
    <MomentsSection /><ApproachSection /><StepExplorer /><AdvertsFirst />
    <section className="sx sx-light book-prompt-band"><div className="sx-shell"><BookPrompt text="Want to see what this looks like for your practice?" /></div></section>
    <UniBoxSection /><GrowthEstimator /><FounderSection /><Pricing /><FitCheck /><Faq /><FinalCta /><SiteFooter />
  </main>;
}
