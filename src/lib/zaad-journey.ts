export const chapters = [
  { points: [] as string[], why: "", id: "top", label: "For healthcare practices", title: "An apple a day keeps the doctor away.", accent: "ZAAD does the opposite.", text: "ZAAD brings new patients to your practice, replies to every enquiry, books the appointment, and brings past patients back, so your team can focus on care.", scene: "A patient searches", detail: "Someone nearby looks for a clinic like yours." },
  { points: ["People searching for a clinic like yours find you","Show up when locals look for care nearby","A clear page that makes booking easy","Offers that give people a reason to visit","More new patients asking to book"] as string[], why: "most people choose from the first few clinics they see when they search.", id: "system", label: "Get found", title: "Bring new patients", accent: "in.", text: "People searching for a clinic like yours find you, and get in touch.", scene: "Search to enquiry", detail: "A patient finds your clinic." },
  { points: ["A reply within moments, day or night","Friendly follow-up if they go quiet","The right questions before booking","The appointment booked in your calendar","A reminder so they turn up"] as string[], why: "the practice that replies first usually gets the booking.", id: "flow", label: "Follow up", title: "Every enquiry gets", accent: "a reply and a booking.", text: "Every patient enquiry gets a quick reply, a friendly follow-up and an easy way to book.", scene: "Enquiry to booked visit", detail: "The patient lands in your calendar." },
  { points: ["Know straight away when a call is missed","An automatic text goes back within a minute","The text links to a short booking form","They pick a time and they're booked"] as string[], why: "a text back within a minute keeps the caller from ringing someone else.", id: "recover", label: "12:40 PM", title: "A patient calls.", accent: "Nobody picks up.", text: "Your team is with a patient. Within a minute, the caller gets a text with a link to book, so they don't ring the next clinic.", scene: "Missed call to booked visit", detail: "When your team can't answer, the patient still hears back." },
  { points: ["Ask patients how their visit went","Invite happy patients to leave a review","More reviews where new patients look"] as string[], why: "recent reviews are often what tips a new patient towards you.", id: "reputation", label: "Tuesday, 4:15 PM", title: "A great visit.", accent: "No review.", text: "Happy patients rarely think to leave a review. A short thank-you with one tap turns a good visit into trust the next patient can see.", scene: "Good visit to 5-star review", detail: "The relationship continues after the appointment." },
  { points: ["Reach patients you haven't seen in a while","Send a friendly, relevant invitation","They reply and book a visit"] as string[], why: "a patient who knows you is easier to book than any stranger.", id: "reactivate", label: "8 months later", title: "She meant", accent: "to come back.", text: "Life got busy. A friendly check-up reminder brings her back before she books somewhere else.", scene: "Past patient to new booking", detail: "Patients you've treated before are glad to hear from you." },
  { points: ["Your bookings on your phone","Every patient message in one inbox","New patients this week","Upcoming appointments"] as string[], why: "you see what's working without chasing your team for updates.", id: "manage", label: "Your practice, at a glance", title: "See it all", accent: "at a glance.", text: "Check your bookings, new patients and messages from your phone, without chasing every conversation.", scene: "Everything in one view", detail: "Every message. One inbox. One clear next step." },
  { points: [] as string[], why: "", id: "contact", label: "Let's talk", title: "Ready to bring", accent: "more patients in?", text: "We'll look at how patients reach you today, show you where they're slipping away, and tell you exactly what we'd fix first.", scene: "A fuller calendar", detail: "The goal isn't an enquiry. It's a patient in your chair." },
] as const;

export function sceneProgress(scroll: number, stride: number) {
  const raw = Math.max(0, Math.min(7, scroll / Math.max(1, stride)));
  const index = Math.floor(raw);
  const local = raw - index;
  const t = Math.max(0, Math.min(1, (local - 0.42) / 0.58));
  return { index, local, travel: index + t * t * (3 - 2 * t) };
}

export type JourneyPalette = { background: string; surface: string; edge: string; accent: string; light: string; muted: string; booked: string };
export function chapterProgress(scroll: number, tops: number[], height: number) {
  let index = 0;
  tops.forEach((top, i) => { if (scroll >= top - 1) index = i; });
  const local = Math.max(0, Math.min(1, (scroll - (tops[index] ?? 0)) / Math.max(1, height)));
  const t = Math.max(0, Math.min(1, (local - 0.42) / 0.58));
  return { index, local, travel: Math.min(tops.length - 1, index + t * t * (3 - 2 * t)) };
}
