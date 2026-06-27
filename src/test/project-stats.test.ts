import { describe, it, expect } from "vitest";

describe("SaaS Kit Complete Project Stats", () => {
  it("has 160+ source files", async () => {
    const fs = await import("fs");
    const count = fs.readdirSync("src", { recursive: true })
      .filter((f: string) => typeof f === "string" && (f.endsWith(".tsx") || f.endsWith(".ts")))
      .length;
    expect(count).toBeGreaterThanOrEqual(160);
  });

  it("has 35+ test files", async () => {
    const fs = await import("fs");
    const testFiles = fs.readdirSync("src/test")
      .filter((f: string) => f.endsWith(".test.ts"));
    expect(testFiles.length).toBeGreaterThanOrEqual(35);
  });

  it("has 23+ UI components", async () => {
    const fs = await import("fs");
    const components = fs.readdirSync("src/components/ui")
      .filter((f: string) => f.endsWith(".tsx") && !f.includes(".stories."));
    expect(components.length).toBeGreaterThanOrEqual(23);
  });

  it("has 14+ shared components", async () => {
    const fs = await import("fs");
    const components = fs.readdirSync("src/components/shared")
      .filter((f: string) => f.endsWith(".tsx"));
    expect(components.length).toBeGreaterThanOrEqual(14);
  });

  it("has 6 email templates", async () => {
    const fs = await import("fs");
    const emails = fs.readdirSync("src/emails")
      .filter((f: string) => f.endsWith(".tsx"));
    expect(emails.length).toBe(6);
  });

  it("has 3 Storybook stories", async () => {
    const fs = await import("fs");
    const stories = fs.readdirSync("src/components/ui")
      .filter((f: string) => f.endsWith(".stories.tsx"));
    expect(stories.length).toBe(3);
  });

  it("has 3 E2E test files", async () => {
    const fs = await import("fs");
    const e2e = fs.readdirSync("e2e")
      .filter((f: string) => f.endsWith(".spec.ts"));
    expect(e2e.length).toBe(3);
  });

  it("has translation files", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("messages/en.json")).toBe(true);
    expect(fs.existsSync("messages/zh.json")).toBe(true);
  });

  it("has all config files", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("drizzle.config.ts")).toBe(true);
    expect(fs.existsSync("vitest.config.ts")).toBe(true);
    expect(fs.existsSync("playwright.config.ts")).toBe(true);
    expect(fs.existsSync(".storybook/main.ts")).toBe(true);
  });

  it("has all infra files", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("Dockerfile")).toBe(true);
    expect(fs.existsSync("docker-compose.yml")).toBe(true);
    expect(fs.existsSync(".github/workflows/ci.yml")).toBe(true);
    expect(fs.existsSync(".env.example")).toBe(true);
    expect(fs.existsSync("LICENSE")).toBe(true);
    expect(fs.existsSync("CONTRIBUTING.md")).toBe(true);
  });

  it("has 30+ pages", async () => {
    const fs = await import("fs");
    const pages = fs.readdirSync("src", { recursive: true })
      .filter((f: string) => typeof f === "string" && f.endsWith("page.tsx"));
    expect(pages.length).toBeGreaterThanOrEqual(30);
  });

  it("has 10+ API routes", async () => {
    const fs = await import("fs");
    const routes = fs.readdirSync("src", { recursive: true })
      .filter((f: string) => typeof f === "string" && f.endsWith("route.ts"));
    expect(routes.length).toBeGreaterThanOrEqual(10);
  });
});
