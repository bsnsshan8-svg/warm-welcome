export const WEEKS = 4.345;

export type LeakInputs = {
  missed: number; convS: number; recS: number; msgs: number; past: number;
  retS: number; rev: number; comp: number; web: "no" | "yes"; val: number;
};

export const defaultInputs: LeakInputs = { missed: 18, convS: 20, recS: 30, msgs: 12, past: 300, retS: 5, rev: 45, comp: 180, web: "no", val: 1500 };

const num = (v: number) => (Number.isFinite(v) && v > 0 ? v : 0);
const lost = (count: number, conv: number, rec: number, perMonth: boolean) => count * conv * (1 - rec) * (perMonth ? 1 : WEEKS);

export function computeLeak(i: LeakInputs) {
  const conv = num(i.convS) / 100, rec = num(i.recS) / 100, cautious = Math.min(1, rec + 0.2), val = num(i.val);
  const callsN = lost(num(i.missed), conv, rec, false), callsC = lost(num(i.missed), conv, cautious, false);
  const msgsN = lost(num(i.msgs), conv, rec, true), msgsC = lost(num(i.msgs), conv, cautious, true);
  const pHigh = callsN + msgsN, pLow = callsC + msgsC;
  const largest = callsN === 0 && msgsN === 0 ? null : callsN >= msgsN ? "Calls missed" : "Messages not answered in time";
  return {
    pHigh, pLow, dHigh: pHigh * val, dLow: pLow * val,
    callsValue: callsN * val, msgsValue: msgsN * val,
    pastValue: num(i.past) * (num(i.retS) / 100) * val,
    reviewGap: num(i.comp) - num(i.rev),
    webAvailable: i.web === "yes",
    largest,
  };
}
export type LeakResult = ReturnType<typeof computeLeak>;

export const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(n));
export function bigNumber(r: LeakResult) {
  return Math.round(r.dLow) === Math.round(r.dHigh) ? usd(r.dHigh) : `${usd(r.dLow)} to ${usd(r.dHigh)}`;
}
