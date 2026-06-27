import { describe, it, expect } from "vitest";

describe("SaaS Kit Storybook", () => {
  it("has storybook config", async () => {
    const fs = await import("fs");
    expect(fs.existsSync(".storybook/main.ts")).toBe(true);
    expect(fs.existsSync(".storybook/preview.ts")).toBe(true);
  });

  it("has button stories", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/ui/button.stories.tsx")).toBe(true);
  });

  it("has card stories", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/ui/card.stories.tsx")).toBe(true);
  });

  it("has badge stories", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/ui/badge.stories.tsx")).toBe(true);
  });
});

describe("SaaS Kit E2E Tests", () => {
  it("has playwright config", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("playwright.config.ts")).toBe(true);
  });

  it("has landing page E2E tests", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("e2e/landing.spec.ts")).toBe(true);
  });

  it("has auth E2E tests", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("e2e/auth.spec.ts")).toBe(true);
  });

  it("has marketing E2E tests", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("e2e/marketing.spec.ts")).toBe(true);
  });
});

describe("SaaS Kit OG Image", () => {
  it("has OG image route", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/og/route.tsx")).toBe(true);
  });

  it("has sitemap", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/sitemap.ts")).toBe(true);
  });

  it("has robots.txt", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/robots.ts")).toBe(true);
  });

  it("has manifest", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/manifest.ts")).toBe(true);
  });
});
