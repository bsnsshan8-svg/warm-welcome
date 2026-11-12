import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, LegalPage } from "@/components/journey/InfoPage";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("/privacy", "Privacy Policy — ZAAD", "What ZAAD collects through this site, how we use it, where it is stored and your choices."),
  component: () => <LegalPage title="Privacy Policy">
    <p>This policy explains how {BUSINESS} ("ZAAD", "we") handles information collected through this website.</p>
    <h2>Who this site is for</h2>
    <p>This site is for clinic owners and their teams, not for patients. Please do not use it to send health information or patient details. We are not a HIPAA business associate for this site.</p>
    <h2>What we collect</h2>
    <ul><li>Your name and clinic name</li><li>Your phone number and email address</li><li>The numbers you type into the calculator</li><li>The advert or link that brought you here (UTM source)</li><li>Your consent record: the time you agreed and the wording you agreed to</li></ul>
    <h2>How we use it</h2>
    <p>We use this information to contact you about your Clinic Audit and about ZAAD services. We contact you by call, text or email only with the consent you give on our form.</p>
    <h2>Where it is stored</h2>
    <p>Your information is stored in our customer management system, GoHighLevel, which processes it on our behalf.</p>
    <h2>Site analytics</h2>
    <p>Our hosting provider, Lovable, records basic visit information: the pages visited, where visitors came from, their country, browser, operating system and device type, how long they stay, how fast pages load, and errors. It uses no cookies, stores nothing on your device, doesn't keep IP addresses and doesn't identify visitors. Detailed data is kept for 90 days and daily summaries for a year. Lovable collects this data for us. <a href="https://lovable.dev/privacy">Lovable's privacy policy</a> explains how it handles it.</p>
    <p>Our booking page links to Calendly, which has its own privacy policy.</p>
    <h2>What we don't do</h2>
    <p>We do not sell personal data.</p>
    <h2>Your choices</h2>
    <p>You can reply STOP to any text to stop texts, use the unsubscribe link in any email, or email us to ask what we hold about you or to delete it. See our <Link to="/sms-terms">SMS and email terms</Link>.</p>
    <h2>Contact</h2>
    <p><a href="mailto:azan@zeroapplesaday.com">azan@zeroapplesaday.com</a> · <a href="tel:+14065058898">+1 406 505 8898</a></p>
  </LegalPage>,
});
