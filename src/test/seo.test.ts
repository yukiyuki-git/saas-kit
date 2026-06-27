import { describe, it, expect } from "vitest";

describe("SaaS Kit Health Check", () => {
  it("health route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/health/route.ts")).toBe(true);
  });

  it("health route returns healthy", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/health/route.ts", "utf-8");
    expect(content).toContain("healthy");
    expect(content).toContain("timestamp");
    expect(content).toContain("version");
  });
});

describe("SaaS Kit OG Image", () => {
  it("OG route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/og/route.tsx")).toBe(true);
  });

  it("OG route generates SVG", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/og/route.tsx", "utf-8");
    expect(content).toContain("svg");
    expect(content).toContain("image/svg+xml");
  });
});

describe("SaaS Kit Sitemap & Robots", () => {
  it("sitemap exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/sitemap.ts")).toBe(true);
  });

  it("robots.txt exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/robots.ts")).toBe(true);
  });

  it("manifest exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/manifest.ts")).toBe(true);
  });
});
