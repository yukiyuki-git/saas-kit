import { describe, it, expect } from "vitest";

describe("SaaS Kit Production Features", () => {
  it("has environment validation", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/env.ts", "utf-8");
    expect(content).toContain("createEnv");
    expect(content).toContain("DATABASE_URL");
    expect(content).toContain("STRIPE_SECRET_KEY");
    expect(content).toContain("BETTER_AUTH_SECRET");
  });

  it("has lazy Stripe initialization", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/lib/stripe.ts", "utf-8");
    expect(content).toContain("getStripe");
    expect(content).not.toContain("new Stripe(process.env.STRIPE_SECRET_KEY!)");
  });

  it("has lazy DB initialization", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/lib/auth.ts", "utf-8");
    expect(content).toContain("getDb");
  });

  it("has Suspense boundary for useSearchParams", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/(auth)/login/page.tsx", "utf-8");
    expect(content).toContain("Suspense");
  });

  it("has cookie consent component", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/cookie-consent.tsx")).toBe(true);
  });

  it("has network status component", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/network-status.tsx")).toBe(true);
  });

  it("has countdown timer component", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/countdown-timer.tsx")).toBe(true);
  });

  it("has back to top component", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/back-to-top.tsx")).toBe(true);
  });

  it("has search bar component", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/search-bar.tsx")).toBe(true);
  });
});
