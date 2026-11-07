import { createFileRoute } from "@tanstack/react-router";
import { UniBoxSection } from "@/components/journey/SystemSections";
import { StepExplorer } from "@/components/journey/StepExplorer";
import { ProblemGrid } from "@/components/journey/Extras";
import { CalculatorPromo, CentredHero, Pricing, SpecialtyPicker } from "@/components/journey/MoreSections";
import { Faq } from "@/components/journey/NewSections";
import { ApproachSection, FinalCta, SiteFooter } from "@/components/journey/FinalSections";
import { MomentsSection } from "@/components/journey/MomentsSection";
import { SiteHeader } from "@/components/journey/SiteHeader";
import { HomeMotion } from "@/components/journey/HomeMotion";
import { ClinicWeek } from "@/components/journey/ClinicWeek";

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
    <CentredHero /><SpecialtyPicker /><ProblemGrid />
    <MomentsSection /><ClinicWeek /><ApproachSection /><StepExplorer />
    <UniBoxSection /><CalculatorPromo /><Pricing /><Faq /><FinalCta /><SiteFooter />
  </main>;
}
