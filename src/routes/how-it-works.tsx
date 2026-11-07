import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/journey/SiteHeader";
import { HomeMotion } from "@/components/journey/HomeMotion";
import { MomentsSection } from "@/components/journey/MomentsSection";
import { ClinicWeek } from "@/components/journey/ClinicWeek";
import { BookPrompt } from "@/components/journey/MoreSections";
import { SiteFooter } from "@/components/journey/FinalSections";

const title = "How ZAAD Works — ZAAD";
const desc = "See what happens to an enquiry, from the first message to a five-star review, and how a clinic's week changes with ZAAD.";

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
      <div className="sx-shell"><h1 id="hiw-title">How ZAAD works</h1><p>See what happens to an enquiry, from the first message to a five-star review.</p></div>
    </section>
    <MomentsSection /><ClinicWeek />
    <section className="sx sx-light book-prompt-band"><div className="sx-shell"><BookPrompt text="Want to see what this looks like for your practice?" /></div></section>
    <SiteFooter />
  </main>;
}
