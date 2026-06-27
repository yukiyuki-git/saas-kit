import { describe, it, expect } from "vitest";
import { PLANS } from "@/lib/stripe";

describe("Rate Limiting", () => {
  it("PLANS object has correct structure", () => {
    expect(PLANS).toBeDefined();
    expect(typeof PLANS).toBe("object");
  });

  it("free plan exists and has correct properties", () => {
    expect(PLANS.free).toBeDefined();
    expect(PLANS.free.name).toBe("Free");
    expect(PLANS.free.price).toBe(0);
    expect(PLANS.free.features).toBeDefined();
    expect(Array.isArray(PLANS.free.features)).toBe(true);
  });

  it("pro plan exists and has correct properties", () => {
    expect(PLANS.pro).toBeDefined();
    expect(PLANS.pro.name).toBe("Pro");
    expect(PLANS.pro.price).toBe(29);
    expect(PLANS.pro.features).toBeDefined();
  });

  it("enterprise plan exists and has correct properties", () => {
    expect(PLANS.enterprise).toBeDefined();
    expect(PLANS.enterprise.name).toBe("Enterprise");
    expect(PLANS.enterprise.price).toBe(99);
    expect(PLANS.enterprise.features).toBeDefined();
  });

  it("all plans have features as arrays", () => {
    for (const plan of Object.values(PLANS)) {
      expect(Array.isArray(plan.features)).toBe(true);
      expect(plan.features.length).toBeGreaterThan(0);
    }
  });

  it("all plans have limits object", () => {
    for (const plan of Object.values(PLANS)) {
      expect(plan.limits).toBeDefined();
      expect(typeof plan.limits.teamMembers).toBe("number");
      expect(typeof plan.limits.apiCalls).toBe("number");
    }
  });

  it("plans are ordered by price", () => {
    expect(PLANS.free.price).toBeLessThanOrEqual(PLANS.pro.price);
    expect(PLANS.pro.price).toBeLessThanOrEqual(PLANS.enterprise.price);
  });

  it("higher plans have higher limits", () => {
    expect(PLANS.free.limits.teamMembers).toBeLessThanOrEqual(PLANS.pro.limits.teamMembers);
    expect(PLANS.pro.limits.teamMembers).toBeLessThanOrEqual(PLANS.enterprise.limits.teamMembers);
    expect(PLANS.free.limits.apiCalls).toBeLessThanOrEqual(PLANS.pro.limits.apiCalls);
    expect(PLANS.pro.limits.apiCalls).toBeLessThanOrEqual(PLANS.enterprise.limits.apiCalls);
  });
});
