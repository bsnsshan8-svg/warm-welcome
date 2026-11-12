import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";

const BOOKING_URL = "https://calendly.com/azan-zeroapplesaday/15-min-demo";

const title = "Reserve Your Clinic Audit Time — ZAAD";
const desc = "Reserve a time for your 30-minute Clinic Audit by phone. $17 launch price.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://zeroapplesaday.com/book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://zeroapplesaday.com/book" }],
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
        <span className="sx-kicker">Free 15-minute call</span>
        <h1 id="book-title">Reserve your Clinic Audit <em>time</em></h1>
        <p className="book-lead">$17 launch price. 30 minutes by phone. A practical call about what happens between a patient's first enquiry and their appointment. No pressure, no jargon.</p>
        <p className="book-sub">On the call we'll look at:</p>
        <ul className="book-ticks">
          {["Where your enquiries come from today", "Where patients drop out before booking", "What a steady flow of new patients would look like for your practice"].map(t => <li key={t}><Check size={20} aria-hidden="true" />{t}</li>)}
        </ul>
        <Button asChild variant="unstyled" size="unstyled" className="journey-primary book-cta"><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Choose a time <ArrowUpRight size={20} /></a></Button>
        <p className="book-alt">Payment will be added here soon; until then your audit is reserved at no charge.</p>
        <p className="book-alt">Prefer to talk first? Call <a href="tel:+14065058898">+1 406 505 8898</a> or email <a href="mailto:azan@zeroapplesaday.com">azan@zeroapplesaday.com</a></p>
        <p className="book-guarantee">30-day money-back guarantee on every plan.</p>
      </div>
    </section>
  </main>;
}
