import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/journey/InfoPage";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/sms-terms")({
  head: () => pageHead("/sms-terms", "SMS and Email Terms — ZAAD", "How ZAAD contacts you by call, text and email, and how to opt out."),
  component: () => <LegalPage title="SMS and email terms">
    <h2>Consent</h2>
    <p>ZAAD (Zero Apples A Day) contacts you by call, text or email only with the consent you give on our form. We record the time you agreed and the wording you agreed to.</p>
    <p>Consent is not a condition of buying anything from us.</p>
    <h2>What we send</h2>
    <p>Messages about your calculator result, your Clinic Audit and ZAAD services. Message frequency varies.</p>
    <h2>Texts</h2>
    <ul><li>Message and data rates may apply.</li><li>Reply STOP to opt out of texts.</li><li>Reply HELP for help.</li><li>Carriers are not liable for delayed or undelivered messages.</li></ul>
    <h2>Emails</h2>
    <p>Every email carries an unsubscribe link.</p>
    <h2>Please don't send health information</h2>
    <p>Do not send patient or health information by text or email to us.</p>
    <h2>More</h2>
    <p>See our <Link to="/privacy">Privacy Policy</Link>, or email <a href="mailto:azan@zeroapplesaday.com">azan@zeroapplesaday.com</a>.</p>
  </LegalPage>,
});
