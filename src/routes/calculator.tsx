import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";
import { LeakCalculator } from "@/components/journey/LeakCalculator";

const title = "Clinic Audit and Leak Calculator — ZAAD";
const desc = "See what missed calls, unanswered messages and lost past patients cost your clinic each month. Two minutes, your own numbers.";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zeroapplesaday.com/calculator" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zeroapplesaday.com/calculator" }],
  }),
  component: CalculatorPage,
});


const covers = [
  ["A review of your own numbers: calls, messages, reviews and past patients", "$47 value"],
  ["Every leak we find in how patients reach your clinic, biggest first", "$60 value"],
  ["How to fix each one, in an order that suits a busy clinic", "$60 value"],
  ["How we can set it all up for you, if you want that, and what it costs", "$30 value"],
];
const worksIf = ["You have never run an ad", "Your front desk is busy all day", "You don't use any special software", "You only have 30 minutes this week", "You're not sure how many calls you miss"];
const faqs = [
  ["Is the calculator free?", "Yes. We ask for your contact details so we can send your result and follow up about it."],
  ["What happens on the 30-minute call?", "We go through your numbers, show you where patients slip away, explain how to fix each leak, and show how we can set it up for you if you want that. You can say no to that part."],
  ["Who is the call with?", "Someone from the ZAAD team, one to one. It is not a group webinar."],
  ["What do I need to prepare?", "Your phone's call log, your patient software and your Google listing."],
  ["Is this only for chiropractors?", "No. Any clinic that takes calls and books appointments can use it."],
  ["Is it a subscription?", "No. It is one payment of $17."],
  ["What if the call isn't useful?", "Reply to your receipt email within 30 days and we'll refund your $17."],
  ["What if I can't make my time?", "You can pick another time from your confirmation email."],
];

function CalculatorPage() {
  return <main className="journey-page calc-page">
    <header className="journey-header">
      <Link to="/" aria-label="ZAAD home" className="journey-logo"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day" /></Link>
      <span />
      <Button asChild variant="unstyled" size="unstyled" className="journey-call"><Link to="/"><ArrowLeft size={18} /> Home</Link></Button>
    </header>

    <section className="calc-hero" aria-labelledby="calc-title">
      <div className="calc-shell">
        <span className="calc-pill">For medical practices · Clinic Audit</span>
        <h1 id="calc-title">See what your clinic's leaks cost you each month.</h1>
        <p className="calc-strip">Two minutes. Your own numbers.</p>
        <p className="calc-lead">Most clinics don't need more marketing. They need every call and message answered and followed up. Answer a few questions and see where patients slip away.</p>
        <ul className="calc-ticks">{["Takes about 2 minutes", "Free to try", "Built from your own numbers"].map(t => <li key={t}><Check size={18} aria-hidden="true" />{t}</li>)}</ul>
      </div>
    </section>

    <section className="calc-main" aria-label="Leak calculator">
      <LeakCalculator />
    </section>

    <section className="calc-offer" aria-labelledby="offer-title">
      <div className="calc-shell calc-offer-grid">
        <div>
          <h2 id="offer-title">See where patients slip away, and how to fix it.</h2>
          <p>The calculator shows the size of the problem. In a 30-minute one-to-one call, we look at your clinic and show you what is causing it and what to do about it.</p>
          <h3>What the call covers</h3>
          <ul className="calc-list">{covers.map(([t, v]) => <li key={t}><Check size={18} aria-hidden="true" /><span>{t} <em>({v})</em></span></li>)}</ul>
          <h3>Works even if…</h3>
          <ul className="calc-list">{worksIf.map(t => <li key={t}><Check size={18} aria-hidden="true" /><span>{t}</span></li>)}</ul>
          <div className="calc-why"><h3>Why only $17?</h3><p>A small price keeps the call open to any clinic and means we both turn up prepared. The price goes up to $47 after launch. If you want help setting things up, we will show you how on the call. There is no obligation.</p></div>
        </div>
        <div className="calc-buy">
          <p className="calc-was">Total value <s>$197</s></p>
          <p className="calc-price">$17</p>
          <p className="calc-tag">Launch price. Goes up to $47.</p>
          <Button asChild variant="unstyled" size="unstyled" className="journey-primary calc-btn"><Link to="/audit">Book my audit <ArrowRight size={18} /></Link></Button>
          <p className="calc-small">One payment. Pick your time right after.</p>
          <p className="calc-small">30-day guarantee. If the call doesn't show you something useful about your clinic, reply to your receipt email within 30 days and we'll refund your $17.</p>
        </div>
      </div>
    </section>

    <section className="calc-faq" aria-labelledby="faq-title">
      <div className="calc-shell">
        <h2 id="faq-title">Questions</h2>
        <Accordion type="single" collapsible>{faqs.map(([q, a], i) => <AccordionItem key={q} value={`f${i}`}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion>
      </div>
    </section>

    <footer className="calc-footer">
      <div className="calc-shell">
        <p>We use your details to send your result and to contact you about it. The figures above are estimates based on your own inputs and are not a guarantee of results. This page does not give medical, legal or financial advice.</p>
        <p>ZAAD · 1001 S Main St, Ste 500, Kalispell MT 59901, US · All prices are in US dollars.</p>
      </div>
    </footer>
  </main>;
}
