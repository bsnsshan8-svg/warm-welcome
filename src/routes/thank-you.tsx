import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoPage } from "@/components/journey/InfoPage";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/thank-you")({
  head: () => pageHead("/thank-you", "Your Clinic Audit Is Reserved — ZAAD", "Next steps before your 30-minute Clinic Audit call with ZAAD.", { noindex: true }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return <InfoPage kicker="Clinic Audit" title="You're on the list for your Clinic Audit">
    <section className="sx sx-light info-body"><div className="sx-shell info-prose">
      <h2>What happens next</h2>
      <ol>
        <li>Check your email and texts for your call time.</li>
        <li>Before the call, have your phone's call log and your Google reviews page open.</li>
        <li>Please don't send us any patient details.</li>
      </ol>
      <div className="au-cta"><Button asChild variant="unstyled" size="unstyled" className="journey-primary"><a href="/#estimator">Run the calculator while you wait <ArrowRight size={18} aria-hidden="true" /></a></Button></div>
    </div></section>
  </InfoPage>;
}
