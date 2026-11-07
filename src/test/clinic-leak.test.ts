import { describe, expect, it } from "vitest";
import { computeLeak, defaultInputs, bigNumber } from "@/lib/clinic-leak";

describe("clinic leak calculator", () => {
  it("computes default call and message losses", () => {
    const r = computeLeak(defaultInputs);
    // calls: 18*0.2*0.7*4.345 = 10.9494 ; messages: 12*0.2*0.7 = 1.68
    expect(r.pHigh).toBeCloseTo(12.6294, 3);
    // cautious rec 0.5: 18*0.2*0.5*4.345=7.821 ; 12*0.2*0.5=1.2
    expect(r.pLow).toBeCloseTo(9.021, 3);
    expect(bigNumber(r)).toBe("$13,532 to $18,944");
  });
  it("past patients is one-time past*ret*val", () => {
    expect(computeLeak(defaultInputs).pastValue).toBe(22500);
  });
  it("treats negatives as zero and caps cautious recovery at 100%", () => {
    const r = computeLeak({ ...defaultInputs, missed: -5, msgs: 10, recS: 90 });
    expect(r.callsValue).toBe(0);
    expect(r.pLow).toBe(0);
    expect(r.largest).toBe("Messages not answered in time");
  });
});
