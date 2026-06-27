import { describe, it, expect } from "vitest";

describe("SaaS Kit Production Readiness", () => {
  it("has proper environment example", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(".env.example", "utf-8");
    expect(content).toContain("DATABASE_URL");
    expect(content).toContain("BETTER_AUTH_SECRET");
    expect(content).toContain("STRIPE_SECRET_KEY");
    expect(content).toContain("RESEND_API_KEY");
  });

  it("has LICENSE file", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("LICENSE", "utf-8");
    expect(content).toContain("MIT");
  });

  it("has CONTRIBUTING guide", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("CONTRIBUTING.md", "utf-8");
    expect(content).toContain("Contributing");
  });

  it("has Dockerfile", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("Dockerfile", "utf-8");
    expect(content).toContain("FROM node");
    expect(content).toContain("WORKDIR");
  });

  it("has docker-compose", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("docker-compose.yml", "utf-8");
    expect(content).toContain("services:");
    expect(content).toContain("postgres");
  });

  it("has CI workflow", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync(".github/workflows/ci.yml", "utf-8");
    expect(content).toContain("pnpm");
    expect(content).toContain("test");
  });

  it("has drizzle config", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("drizzle.config.ts", "utf-8");
    expect(content).toContain("postgresql");
  });

  it("has sitemap generator", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/sitemap.ts")).toBe(true);
  });

  it("has robots.txt generator", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/robots.ts")).toBe(true);
  });

  it("has PWA manifest", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/manifest.ts")).toBe(true);
  });

  it("has Storybook config", async () => {
    const fs = await import("fs");
    expect(fs.existsSync(".storybook/main.ts")).toBe(true);
    expect(fs.existsSync(".storybook/preview.ts")).toBe(true);
  });

  it("has Playwright config", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("playwright.config.ts")).toBe(true);
  });

  it("has i18n config", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/i18n/request.ts")).toBe(true);
    expect(fs.existsSync("src/i18n/routing.ts")).toBe(true);
    expect(fs.existsSync("messages/en.json")).toBe(true);
    expect(fs.existsSync("messages/zh.json")).toBe(true);
  });
});
