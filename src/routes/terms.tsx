import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, LegalPage } from "@/components/journey/InfoPage";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("/terms", "Terms of Service — ZAAD", "The terms for using the ZAAD website, the free calculator and the Clinic Audit."),
  component: () => <LegalPage title="Terms of Service">
    <p>These terms cover your use of this website, run by {BUSINESS}.</p>
    <h2>Who can use this site</h2>
    <p>This site is for clinic owners and their teams. It is not for patients and must not be used to send health information or patient details.</p>
    <h2>The calculator</h2>
    <p>The calculator gives estimates based only on the numbers you enter. It is a planning tool, not a forecast or a promise of results, and it is not medical, legal or financial advice.</p>
    <h2>The Clinic Audit</h2>
    <p>The Clinic Audit is a 30-minute phone call followed by a short written summary. It does not promise any particular result. Refunds are covered in our <Link to="/refund-policy">Refund Policy</Link>.</p>
    <h2>Monthly plans</h2>
    <p>Monthly plans are covered by their own written agreement, which takes priority over these terms for those services.</p>
    <h2>Messages</h2>
    <p>Calls, texts and emails are covered by our <Link to="/sms-terms">SMS and email terms</Link>. How we handle your information is set out in our <Link to="/privacy">Privacy Policy</Link>.</p>
    <h2>Our content</h2>
    <p>The text, images and design on this site belong to ZAAD. Please don't copy them without permission.</p>
    <h2>Limits</h2>
    <p>We work to keep the site accurate and available but can't guarantee it will always be error-free.</p>
    <h2>Contact</h2>
    <p><a href="mailto:azan@zeroapplesaday.com">azan@zeroapplesaday.com</a></p>
  </LegalPage>,
});
