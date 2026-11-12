import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/journey/InfoPage";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("/contact", "Contact ZAAD", "Email, phone and address for ZAAD (Zero Apples A Day) in Kalispell, Montana."),
  component: ContactPage,
});

function ContactPage() {
  return <InfoPage kicker="Contact" title="Contact ZAAD" lead={<p>Questions about the Clinic Audit or our plans? Get in touch.</p>}>
    <section className="sx sx-light info-body"><div className="sx-shell info-prose">
      <h2>Email</h2><p><a href="mailto:azan@zeroapplesaday.com">azan@zeroapplesaday.com</a></p>
      <h2>Phone</h2><p><a href="tel:+14065058898">+1 406 505 8898</a></p>
      <h2>Address</h2><address>ZAAD (Zero Apples A Day), a Genrationz company<br />1001 S Main St, Ste 500, Kalispell MT 59901, United States</address>
      <div className="au-promise"><p>Please do not send patient or health information through this site.</p></div>
    </div></section>
  </InfoPage>;
}
