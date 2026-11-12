import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InfoPage } from "@/components/journey/InfoPage";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/audit")({
  head: () => pageHead("/audit", "The 30-minute Clinic Audit, $17 — ZAAD", "A 30-minute phone call where we go through how patients reach your clinic and show you which gaps to fix first. $17 launch price."),
  component: AuditPage,
});

const look = [
  ["Missed calls and voicemail", "What happens when your phone isn't answered."],
  ["Website and enquiry forms", "How easy it is to get in touch or book from a phone."],
  ["Google reviews", "How your reviews compare with clinics near you."],
  ["Past patients", "Whether people who stopped coming hear from you again."],
  ["Reply speed", "How long a new enquiry waits for a first reply."],
];
const steps = [["Reserve your time", "Pick a 30-minute slot that suits you."], ["We call you for 30 minutes", "A phone call with our team. No kit or software needed."], ["You get the summary", "A short written summary of what we found, sent after the call."]];
const faqs = [
  ["Is it really 30 minutes?", "Yes. It is a 30-minute phone call."],
  ["Do I need to prepare?", "Have your phone's call log and your Google reviews page ready. That is all."],
  ["Do I need to share patient information?", "No. Please don't share any patient details."],
  ["What happens after?", "You can stop there, or we can talk about the monthly plans."],
  ["Why only $17?", "It is a launch price while we onboard our first clinics."],
];

function Primary() {
  return <Button asChild variant="unstyled" size="unstyled" className="journey-primary"><Link to="/book">Reserve my audit, $17 <ArrowUpRight size={18} aria-hidden="true" /></Link></Button>;
}

function AuditPage() {
  return <InfoPage kicker="Clinic Audit · By phone" title="The 30-minute Clinic Audit" lead={<>
    <p>We go through how patients reach your clinic today and show you which gaps to fix first. $17 launch price.</p>
    <p className="au-price"><b>$17</b> <s>$47</s> <small>regular price</small></p>
    <div className="info-actions"><Primary /><Button asChild variant="unstyled" size="unstyled" className="journey-text-link"><a href="/#estimator">Run the free calculator first <ArrowRight size={18} aria-hidden="true" /></a></Button></div>
  </>}>
    <section className="sx sx-light info-body"><div className="sx-shell au-wrap">
      <div className="au-sec"><h2>What we look at</h2><div className="au-grid">{look.map(([t, d]) => <div key={t} className="au-card"><h3>{t}</h3><p>{d}</p></div>)}</div></div>
      <div className="au-sec info-prose"><h2>What you walk away with</h2>
        <ul>{["A short written summary of the biggest gaps, in order", "What to fix first", "What each fix would involve"].map(t => <li key={t}>{t}</li>)}</ul>
        <p>The audit shows you where patients slip away. It does not promise any particular result.</p></div>
      <div className="au-sec"><h2>How it works</h2><div className="au-grid">{steps.map(([t, d], i) => <div key={t} className="au-card"><span className="au-num">{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div>
      <div className="au-sec info-prose"><h2>Who it's for</h2><p>Clinic owners and practice managers in the US.</p>
        <div className="au-promise"><h2>Our promise</h2><p><Check size={18} aria-hidden="true" /> If the call isn't useful, tell us within 30 days and we refund the $17.</p></div></div>
      <div className="au-sec calc-faq"><h2>Questions</h2><Accordion type="single" collapsible>{faqs.map(([q, a], i) => <AccordionItem key={q} value={`a${i}`}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></div>
      <div className="au-cta"><Primary /></div>
    </div></section>
  </InfoPage>;
}
