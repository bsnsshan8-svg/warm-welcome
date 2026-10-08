import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";

// Replace with the real scheduling link.
const BOOKING_URL = "[YOUR BOOKING LINK]";

const title = "Book a Free Strategy Call — ZAAD";
const desc = "A free 30-minute call about what happens between a patient's first enquiry and their appointment. No pressure, no jargon.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return <main className="journey-page book-page">
    <header className="journey-header">
      <Link to="/" aria-label="ZAAD home" className="journey-logo"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day" /></Link>
      <span />
      <Button asChild variant="unstyled" size="unstyled" className="journey-call"><Link to="/"><ArrowLeft size={18} /> Back</Link></Button>
    </header>
    <section className="sx sx-light book-main" aria-labelledby="book-title">
      <div className="sx-shell book-inner">
        <span className="sx-kicker">Free 30-minute call</span>
        <h1 id="book-title">Let's find where your patients are <em>slipping away.</em></h1>
        <p className="book-lead">A practical call about what happens between a patient's first enquiry and their appointment. No pressure, no jargon.</p>
        <p className="book-sub">On the call we'll look at:</p>
        <ul className="book-ticks">
          {["Where your enquiries come from today", "Where patients drop out before booking", "What a steady flow of new patients would look like for your practice"].map(t => <li key={t}><Check size={20} aria-hidden="true" />{t}</li>)}
        </ul>
        <Button asChild variant="unstyled" size="unstyled" className="journey-primary book-cta"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Choose a time <ArrowUpRight size={20} /></a></Button>
        <p className="book-alt">Prefer to talk first? Call <a href="tel:+14089423358">+1 408 942 3358</a> or email <a href="mailto:Info@zeroapplesaday.com">Info@zeroapplesaday.com</a></p>
        <p className="book-guarantee">30-day money-back guarantee on every plan.</p>
      </div>
    </section>
  </main>;
}
