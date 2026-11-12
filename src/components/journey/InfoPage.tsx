import type { ReactNode } from "react";
import { SiteHeader } from "@/components/journey/SiteHeader";
import { SiteFooter } from "@/components/journey/FinalSections";

export function InfoPage({ kicker, title, lead, children }: { kicker?: string; title: ReactNode; lead?: ReactNode; children: ReactNode }) {
  return <main className="journey-page info-page">
    <SiteHeader />
    <section className="hiw-hero info-hero" aria-labelledby="info-title">
      <div className="sx-shell">{kicker && <span className="sx-kicker info-kicker">{kicker}</span>}<h1 id="info-title">{title}</h1>{lead && <div className="info-lead">{lead}</div>}</div>
    </section>
    {children}
    <SiteFooter />
  </main>;
}

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return <InfoPage kicker="Last updated: 12 November 2026" title={title}>
    <section className="sx sx-light info-body"><div className="sx-shell info-prose">
      {children}
      <p className="info-review">This page is a plain-language policy and should be reviewed by a lawyer before launch.</p>
    </div></section>
  </InfoPage>;
}

export const BUSINESS = "ZAAD (Zero Apples A Day), a Genrationz company, 1001 S Main St, Ste 500, Kalispell MT 59901, United States";
