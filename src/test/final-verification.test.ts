import { describe, it, expect } from "vitest";

describe("SaaS Kit Complete File Verification", () => {
  it("has all UI components (23)", async () => {
    const fs = await import("fs");
    const components = [
      "button", "card", "badge", "input", "label",
      "textarea", "tabs", "separator", "sonner",
      "switch", "table", "dialog", "sheet",
      "dropdown-menu", "avatar", "accordion",
      "select", "popover", "scroll-area", "tooltip",
      "command", "progress", "skeleton",
    ];
    for (const comp of components) {
      expect(fs.existsSync(`src/components/ui/${comp}.tsx`)).toBe(true);
    }
  });

  it("has all shared components (14)", async () => {
    const fs = await import("fs");
    const components = [
      "navbar", "footer", "theme-toggle", "theme-provider",
      "command-menu", "cookie-consent", "back-to-top",
      "search-bar", "error-boundary", "data-table",
      "file-upload", "loading", "network-status",
      "countdown-timer",
    ];
    for (const comp of components) {
      expect(fs.existsSync(`src/components/shared/${comp}.tsx`)).toBe(true);
    }
  });

  it("has all dashboard components", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/dashboard/sidebar.tsx")).toBe(true);
    expect(fs.existsSync("src/components/dashboard/charts.tsx")).toBe(true);
    expect(fs.existsSync("src/components/dashboard/notification-bell.tsx")).toBe(true);
  });

  it("has icons component", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/icons.tsx")).toBe(true);
  });

  it("has all lib files (15)", async () => {
    const fs = await import("fs");
    const libs = [
      "auth", "stripe", "email", "rbac", "api-key", "utils",
      "validations", "feature-flags", "webhook", "rate-limit",
      "security-headers",
    ];
    for (const lib of libs) {
      expect(fs.existsSync(`src/lib/${lib}.ts`)).toBe(true);
    }
    expect(fs.existsSync("src/lib/db/schema.ts")).toBe(true);
    expect(fs.existsSync("src/lib/db/index.ts")).toBe(true);
    expect(fs.existsSync("src/lib/db/seed.ts")).toBe(true);
    expect(fs.existsSync("src/lib/db/migrate.ts")).toBe(true);
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
});
