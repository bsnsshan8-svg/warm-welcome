import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const CONSENT_TEXT = "I agree that ZAAD may call, text or email me about my result and the clinic audit. Message and data rates may apply. Reply STOP to opt out of texts.";

const s = (max = 200) => z.string().max(max).default("");
const n = z.number().finite();

const leadInput = z.object({
  name: z.string().trim().min(1).max(100),
  clinic: z.string().trim().min(1).max(150),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(255),
  page_url: s(1000), utm_source: s(), utm_medium: s(), utm_campaign: s(), utm_content: s(), utm_term: s(),
  calls_missed_per_week: n, conv_pct: n, voicemail_recovery_pct: n, messages_per_month: n, past_patients: n,
  return_pct: n, google_reviews: n, competitor_reviews: n, online_booking_at_night: z.enum(["yes", "no"]), patient_value: n,
  leak_low_usd: n, leak_high_usd: n, patients_low: n, patients_high: n, calls_value_usd_month: n,
  messages_value_usd_month: n, past_patients_value_usd_once: n, review_gap: n, largest_leak: s(),
});
export type LeadPayloadInput = z.input<typeof leadInput>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => leadInput.parse(d))
  .handler(async ({ data }) => {
    const url = process.env["GHL_WEBHOOK_URL"];
    if (!url) { console.error("[submitLead] GHL_WEBHOOK_URL secret is not set; lead not sent."); return { ok: false }; }
    const { name, clinic, ...rest } = data;
    const [first, ...others] = name.split(/\s+/);
    const payload = {
      first_name: first ?? "", last_name: others.join(" "), full_name: name, clinic_name: clinic,
      phone: rest.phone, email: rest.email,
      consent_calls_texts_emails: true, consent_text: CONSENT_TEXT, consent_timestamp: new Date().toISOString(),
      source: "calculator", ...rest,
    };
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { console.error(`[submitLead] GHL webhook failed [${res.status}]: ${await res.text()}`); return { ok: false }; }
      return { ok: true };
    } catch (e) {
      console.error("[submitLead] GHL webhook error", e);
      return { ok: false };
    }
  });
