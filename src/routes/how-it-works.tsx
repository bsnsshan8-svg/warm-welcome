import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/journey/SiteHeader";
import { AdToChair } from "@/components/journey/AdToChair";
import { HomeMotion } from "@/components/journey/HomeMotion";
import { MomentsSection } from "@/components/journey/MomentsSection";
import { ClinicWeek } from "@/components/journey/ClinicWeek";
import { BookPrompt, FitCheck } from "@/components/journey/MoreSections";
import { ApproachSection, SiteFooter } from "@/components/journey/FinalSections";
import { GoodEnquiry } from "@/components/journey/NewSections";

const chips = [["Ad to patient", "journey"], ["A real enquiry", "moments"], ["After hours", "after-hours"], ["Why it works", "approach"], ["Good enquiries", "good-enquiry"], ["Is it a fit?", "fit"]] as const;

const title = "How ZAAD Works — ZAAD";
const desc = "See how ZAAD takes someone from a first advert to a patient in your clinic: finding, answering, following up, qualifying and booking.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zeroapplesaday.com/how-it-works" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zeroapplesaday.com/how-it-works" }],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return <main className="journey-page journey-live">
    <HomeMotion />
    <SiteHeader />
    <section id="top" className="hiw-hero" aria-labelledby="hiw-title">
      <div className="sx-shell"><h1 id="hiw-title">How ZAAD works</h1><p>From the first advert to a patient in your chair, and what happens at every step.</p>
        <nav className="hiw-subnav" aria-label="On this page">{chips.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></div>
    </section>
    <AdToChair id="journey" calcHref="/#estimator" /><MomentsSection /><ClinicWeek /><ApproachSection /><GoodEnquiry /><FitCheck />
    <section className="sx sx-light book-prompt-band"><div className="sx-shell"><BookPrompt text="Want to see what this looks like for your practice?" /></div></section>
    <SiteFooter />
  </main>;
}
