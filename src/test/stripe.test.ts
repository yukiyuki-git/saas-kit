import { describe, it, expect } from "vitest";

// Test that the PLANS configuration is correct
describe("Stripe Plans Configuration", () => {
  it("has all three plans", async () => {
    const { PLANS } = await import("@/lib/stripe");
    expect(PLANS).toHaveProperty("free");
    expect(PLANS).toHaveProperty("pro");
    expect(PLANS).toHaveProperty("enterprise");
  });

  it("free plan has correct pricing", async () => {
    const { PLANS } = await import("@/lib/stripe");
    expect(PLANS.free.price).toBe(0);
    expect(PLANS.free.limits.teamMembers).toBe(1);
    expect(PLANS.free.limits.apiCalls).toBe(1000);
  });

  it("pro plan has correct pricing", async () => {
    const { PLANS } = await import("@/lib/stripe");
    expect(PLANS.pro.price).toBe(29);
    expect(PLANS.pro.limits.teamMembers).toBe(5);
    expect(PLANS.pro.limits.apiCalls).toBe(50000);
  });

  it("enterprise plan has unlimited limits", async () => {
    const { PLANS } = await import("@/lib/stripe");
    expect(PLANS.enterprise.price).toBe(99);
    expect(PLANS.enterprise.limits.teamMembers).toBe(Infinity);
    expect(PLANS.enterprise.limits.apiCalls).toBe(Infinity);
  });

  it("all plans have features array", async () => {
    const { PLANS } = await import("@/lib/stripe");
    for (const plan of Object.values(PLANS)) {
      expect(Array.isArray(plan.features)).toBe(true);
      expect(plan.features.length).toBeGreaterThan(0);
    }
  });
});
