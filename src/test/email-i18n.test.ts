import { describe, it, expect } from "vitest";

describe("SaaS Kit Email Templates", () => {
  it("welcome email exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/emails/welcome.tsx")).toBe(true);
  });

  it("team invite email exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/emails/team-invite.tsx")).toBe(true);
  });

  it("password reset email exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/emails/password-reset.tsx")).toBe(true);
  });

  it("payment receipt email exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/emails/payment-receipt.tsx")).toBe(true);
  });

  it("subscription confirmation email exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/emails/subscription-confirmation.tsx")).toBe(true);
  });

  it("weekly digest email exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/emails/weekly-digest.tsx")).toBe(true);
  });

  it("all emails export components", async () => {
    const fs = await import("fs");
    const emails = [
      "welcome", "team-invite", "password-reset",
      "payment-receipt", "subscription-confirmation", "weekly-digest",
    ];
    for (const email of emails) {
      const content = fs.readFileSync(`src/emails/${email}.tsx`, "utf-8");
      expect(content).toContain("export function");
      expect(content).toContain("Html");
    }
  });
});

describe("SaaS Kit i18n", () => {
  it("has i18n config", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/i18n/request.ts")).toBe(true);
    expect(fs.existsSync("src/i18n/routing.ts")).toBe(true);
    expect(fs.existsSync("src/i18n/middleware.ts")).toBe(true);
  });

  it("has English translations", async () => {
    const fs = await import("fs");
    const en = JSON.parse(fs.readFileSync("messages/en.json", "utf-8"));
    expect(en).toHaveProperty("nav");
    expect(en).toHaveProperty("hero");
    expect(en).toHaveProperty("auth");
    expect(en).toHaveProperty("dashboard");
    expect(en).toHaveProperty("common");
  });

  it("has Chinese translations", async () => {
    const fs = await import("fs");
    const zh = JSON.parse(fs.readFileSync("messages/zh.json", "utf-8"));
    expect(zh).toHaveProperty("nav");
    expect(zh).toHaveProperty("hero");
    expect(zh).toHaveProperty("auth");
    expect(zh).toHaveProperty("dashboard");
    expect(zh).toHaveProperty("common");
  });

  it("English and Chinese have same keys", async () => {
    const fs = await import("fs");
    const en = JSON.parse(fs.readFileSync("messages/en.json", "utf-8"));
    const zh = JSON.parse(fs.readFileSync("messages/zh.json", "utf-8"));
    expect(Object.keys(en).sort()).toEqual(Object.keys(zh).sort());
  });
});
