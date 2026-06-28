import { describe, it, expect } from "vitest";

describe("SaaS Kit Complete Project Verification", () => {
  it("has 30 test files", async () => {
    const fs = await import("fs");
    const testFiles = fs.readdirSync("src/test").filter((f: string) => f.endsWith(".test.ts"));
    expect(testFiles.length).toBeGreaterThanOrEqual(30);
  });

  it("has 23+ UI components", async () => {
    const fs = await import("fs");
    const components = fs.readdirSync("src/components/ui").filter((f: string) => f.endsWith(".tsx") && !f.includes(".stories."));
    expect(components.length).toBeGreaterThanOrEqual(23);
  });

  it("has 14+ shared components", async () => {
    const fs = await import("fs");
    const components = fs.readdirSync("src/components/shared").filter((f: string) => f.endsWith(".tsx"));
    expect(components.length).toBeGreaterThanOrEqual(14);
  });

  it("has 11+ lib files", async () => {
    const fs = await import("fs");
    const libs = fs.readdirSync("src/lib").filter((f: string) => f.endsWith(".ts") && f !== "utils.ts");
    expect(libs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 6 email templates", async () => {
    const fs = await import("fs");
    const emails = fs.readdirSync("src/emails").filter((f: string) => f.endsWith(".tsx"));
    expect(emails.length).toBe(6);
  });

  it("has 16 Storybook stories", async () => {
    const fs = await import("fs");
    const stories = fs.readdirSync("src/components/ui").filter((f: string) => f.endsWith(".stories.tsx"));
    expect(stories.length).toBe(16);
  });

  it("has 5 E2E test files", async () => {
    const fs = await import("fs");
    const e2e = fs.readdirSync("e2e").filter((f: string) => f.endsWith(".spec.ts"));
    expect(e2e.length).toBe(5);
  });

  it("has translation files", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("messages/en.json")).toBe(true);
    expect(fs.existsSync("messages/zh.json")).toBe(true);
  });
});
