export const chapters = [
  { id: "top", label: "The patient journey", title: "An apple a day keeps the doctor away.", accent: "ZAAD does the opposite.", text: "ZAAD builds the patient acquisition system that brings the right people in, follows up automatically, books appointments, and keeps your pipeline moving.", scene: "PATIENT FLOW", detail: "From first click to patient." },
  { id: "system", label: "Acquisition", title: "Bring patients", accent: "in.", text: "Paid ads, local search, landing pages, offers and conversion-focused campaigns.", scene: "AD → NEW ENQUIRY", detail: "Patient discovers the clinic." },
  { id: "flow", label: "Follow-up & booking", title: "Nurture", accent: "and book.", text: "Every enquiry gets an immediate response, qualification, follow-up and booking pathway.", scene: "AI FOLLOW-UP → BOOKED", detail: "The patient moves into the clinic calendar." },
  { id: "recover", label: "Missed call recovery", title: "Recover", accent: "missed calls.", text: "When nobody answers, ZAAD reaches back out and works to recover the appointment.", scene: "MISSED CALL → RECOVERED", detail: "When your team can't answer, ZAAD doesn't let the conversation die." },
  { id: "reputation", label: "Reputation", title: "5-star", accent: "reputation.", text: "Turn completed patient experiences into review requests and build a stronger reputation.", scene: "EXPERIENCE → 5-STAR", detail: "The relationship continues after the appointment." },
  { id: "reactivate", label: "Reactivation", title: "Reactivate", accent: "your database.", text: "Launch targeted reactivation campaigns and offers through messaging.", scene: "OLD PATIENT → REBOOKED", detail: "Your old patient database isn't old revenue." },
  { id: "command", label: "Command center & UniBox", title: "Manage", accent: "it all.", text: "A mobile command center to monitor leads, conversations, appointments and performance.", scene: "EVERYTHING → ONE VIEW", detail: "Different channels. One conversation. One clear next step." },
  { id: "contact", label: "Ready?", title: "Ready to bring", accent: "more patients in?", text: "Let's build a patient acquisition system around your practice.", scene: "A PATIENT GROWTH LOOP", detail: "The goal isn't a lead. It's a real patient." },
] as const;

export function sceneProgress(scroll: number, stride: number) {
  const raw = Math.max(0, Math.min(7, scroll / Math.max(1, stride)));
  const index = Math.floor(raw);
  const local = raw - index;
  const t = Math.max(0, Math.min(1, (local - 0.42) / 0.58));
  return { index, local, travel: index + t * t * (3 - 2 * t) };
}

export type JourneyPalette = { background: string; surface: string; edge: string; accent: string; light: string; muted: string; booked: string };