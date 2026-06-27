import { describe, it, expect } from "vitest";

describe("Authentication Flow Logic", () => {
  it("auth config has email/password enabled", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/lib/auth.ts", "utf-8");
    expect(content).toContain("emailAndPassword");
    expect(content).toContain("enabled: true");
  });

  it("auth config has social providers", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/lib/auth.ts", "utf-8");
    expect(content).toContain("socialProviders");
    expect(content).toContain("github");
    expect(content).toContain("google");
  });

  it("auth config has session management", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/lib/auth.ts", "utf-8");
    expect(content).toContain("session");
    expect(content).toContain("expiresIn");
  });
});

describe("Middleware Configuration", () => {
  it("middleware file exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/middleware.ts")).toBe(true);
  });

  it("middleware has public routes", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/middleware.ts", "utf-8");
    expect(content).toContain("publicRoutes");
    expect(content).toContain("/login");
    expect(content).toContain("/register");
  });
});

describe("Stripe Integration", () => {
  it("stripe config has lazy initialization", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/lib/stripe.ts", "utf-8");
    expect(content).toContain("getStripe");
  });

  it("stripe webhook handler exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/webhooks/stripe/route.ts")).toBe(true);
  });

  it("checkout route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/checkout/route.ts")).toBe(true);
  });

  it("portal route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/portal/route.ts")).toBe(true);
  });
});

describe("Internationalization", () => {
  it("i18n config exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/i18n/request.ts")).toBe(true);
    expect(fs.existsSync("src/i18n/routing.ts")).toBe(true);
  });

  it("translation files exist", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("messages/en.json")).toBe(true);
    expect(fs.existsSync("messages/zh.json")).toBe(true);
  });

  it("English translation has required keys", async () => {
    const fs = await import("fs");
    const en = JSON.parse(fs.readFileSync("messages/en.json", "utf-8"));
    expect(en).toHaveProperty("nav");
    expect(en).toHaveProperty("hero");
    expect(en).toHaveProperty("auth");
    expect(en).toHaveProperty("dashboard");
  });
});
