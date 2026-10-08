import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CalendarCheck, Mail, MapPin, Phone, RefreshCw, Target, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import clinicians from "@/assets/approach-clinicians.jpg";
import finalPhoto from "@/assets/final-clinicians.jpg";
import zaadLogo from "@/assets/zaad-logo.png.asset.json";

function BookButton({ label = "Book a strategy call" }: { label?: string }) {
  return <Button asChild variant="unstyled" size="unstyled" className="journey-primary"><Link to="/book">{label} <ArrowUpRight size={18} aria-hidden="true" /></Link></Button>;
}

const approach = [
  [Wrench, "Fix the basics first", "Adverts work better when replies, reviews and your booking page are ready for the people they bring."],
  [Zap, "The first reply wins", "Patients usually book with the practice that answers first, so every enquiry gets a reply within minutes."],
  [CalendarCheck, "Booked isn't the finish line", "Reminders and easy rescheduling turn bookings into patients who actually walk in."],
  [Target, "The right patients, not just more", "Checking need, interest, fit and timing keeps your team's time for people who will book."],
  [RefreshCw, "Built to keep working", "Reviews and past-patient messages keep bringing patients in, even when adverts are paused."],
] as const;

export function ApproachSection() {
  return <section id="approach" className="sx sx-light zx-approach" aria-labelledby="approach-title">
    <div className="sx-shell zx-approach-grid">
      <div className="zx-approach-left">
        <span className="sx-kicker">Our approach</span>
        <h2 id="approach-title" className="zx-h2">Why this <em>approach</em> works</h2>
        <BookButton />
        <img src={clinicians} alt="Illustration of a small team of clinicians" loading="lazy" width={1024} height={768} className="zx-approach-img" />
      </div>
      <div className="zx-approach-items">
        {approach.map(([Icon, t, d]) => <div key={t} className="zx-item"><Icon size={28} strokeWidth={1.6} aria-hidden="true" className="zx-icon" /><h3>{t}</h3><p>{d}</p></div>)}
        <div className="zx-item zx-item-hl"><p>We don't just get you more enquiries. We help you turn them into <em>patients in your chair.</em></p></div>
      </div>
    </div>
  </section>;
}

export function FinalCta() {
  return <section id="contact" className="zx-final" aria-labelledby="final-title">
    <img src={finalPhoto} alt="" aria-hidden="true" loading="lazy" width={1920} height={1088} className="zx-final-bg" />
    <div className="zx-final-overlay" />
    <div className="zx-final-inner">
      <h2 id="final-title" className="zx-h2">Ready to get more patients into your calendar?</h2>
      <p>We'll look at how patients reach you today, show you where they're slipping away, and tell you exactly what we'd fix first.</p>
      <div className="zx-final-actions">
        <BookButton />
        <Button asChild variant="unstyled" size="unstyled" className="journey-text-link"><a href="#modules">See how it works <ArrowRight size={18} aria-hidden="true" /></a></Button>
      </div>
    </div>
  </section>;
}

const specialties = ["Chiropractors", "Regenerative Medicine", "Physical Therapy", "Dental Clinics", "Med Spas", "Eye Clinics", "Surgeons"];

export function SiteFooter() {
  return <footer className="zx-footer">
    <div className="zx-footer-grid">
      <div className="zx-fcol zx-fbrand">
        <a href="#top" aria-label="ZAAD home"><img src={zaadLogo.url} alt="ZAAD — Zero Apples A Day" /></a>
        <p>A steady flow of new patients for healthcare practices.</p>
        <p className="zx-tagline"><em>More patients.</em> Fewer gaps. <em>Less chasing.</em></p>
        <ul className="zx-contact">
          <li><Phone size={16} aria-hidden="true" /><a href="tel:+14089423358">+1 408 942 3358</a></li>
          <li><Mail size={16} aria-hidden="true" /><a href="mailto:Info@zeroapplesaday.com">Info@zeroapplesaday.com</a></li>
          <li><MapPin size={16} aria-hidden="true" /><address>1001 S Main St, Ste 500, Kalispell MT 59901, United States</address></li>
        </ul>
      </div>
      <nav className="zx-fcol" aria-label="Quick links"><h3>Quick links</h3>
        <a href="#modules">How it works</a><a href="#unibox">UniBox</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><Link to="/book">Book a call</Link>
      </nav>
      <nav className="zx-fcol" aria-label="Who we help"><h3>Who we help</h3>
        {specialties.map(s => <a key={s} href="#who">{s}</a>)}
      </nav>
      <nav className="zx-fcol" aria-label="Plans"><h3>Plans</h3>
        <a href="#pricing">Core systems</a><a href="#pricing">Done for you: Accelerator</a><a href="#pricing">Done for you: Power</a>
      </nav>
      <div className="zx-fcol"><h3>Ready for more patients?</h3>
        <p>Book a free 30-minute call and we'll show you where patients are slipping away.</p>
        <BookButton />
      </div>
    </div>
    <div className="zx-footer-bottom"><small>© 2026 ZAAD — Zero Apples A Day. Built for healthcare practices.</small></div>
  </footer>;
}
