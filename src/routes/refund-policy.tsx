import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/journey/InfoPage";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/refund-policy")({
  head: () => pageHead("/refund-policy", "Refund Policy — ZAAD", "How refunds work for the $17 Clinic Audit and ZAAD's monthly plans."),
  component: () => <LegalPage title="Refund Policy">
    <h2>The Clinic Audit</h2>
    <p>If the $17 Clinic Audit call wasn't useful, email us within 30 days of the call at <a href="mailto:azan@zeroapplesaday.com">azan@zeroapplesaday.com</a> and we refund the $17.</p>
    <h2>Monthly plans</h2>
    <p>Refunds for monthly plans are covered in each plan's own agreement.</p>
  </LegalPage>,
});
