import { describe, it, expect } from "vitest";

describe("SaaS Kit Component Coverage", () => {
  it("has all UI components", async () => {
    const fs = await import("fs");
    const uiComponents = [
      "button", "card", "badge", "input", "label",
      "textarea", "tabs", "separator", "sonner",
      "switch", "table", "dialog", "sheet",
      "dropdown-menu", "avatar", "accordion",
      "select", "popover", "scroll-area", "tooltip",
      "command", "progress", "skeleton",
    ];
    for (const comp of uiComponents) {
      expect(fs.existsSync(`src/components/ui/${comp}.tsx`)).toBe(true);
    }
  });

  it("has all shared components", async () => {
    const fs = await import("fs");
    const sharedComponents = [
      "navbar", "footer", "theme-toggle", "theme-provider",
      "command-menu", "cookie-consent", "back-to-top",
      "search-bar", "error-boundary", "data-table",
      "file-upload", "loading", "network-status",
      "countdown-timer",
    ];
    for (const comp of sharedComponents) {
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
});

describe("SaaS Kit Page Coverage", () => {
  it("has all auth pages", async () => {
    const fs = await import("fs");
    const authPages = ["login", "register", "forgot-password"];
    for (const page of authPages) {
      expect(fs.existsSync(`src/app/(auth)/${page}/page.tsx`)).toBe(true);
    }
  });

  it("has all dashboard pages", async () => {
    const fs = await import("fs");
    const dashboardPages = [
      "dashboard", "team", "billing", "admin", "analytics",
      "settings", "settings/security", "settings/api-keys", "settings/notifications",
    ];
    for (const page of dashboardPages) {
      expect(fs.existsSync(`src/app/(dashboard)/${page}/page.tsx`)).toBe(true);
    }
  });

  it("has all marketing pages", async () => {
    const fs = await import("fs");
    const marketingPages = [
      "pricing", "blog", "about", "contact", "changelog",
      "features", "tech-stack", "faq", "privacy", "terms",
      "api-docs", "api-playground", "sitemap-page",
    ];
    for (const page of marketingPages) {
      expect(fs.existsSync(`src/app/(marketing)/${page}/page.tsx`)).toBe(true);
    }
  });

  it("has all docs pages", async () => {
    const fs = await import("fs");
    const docsPages = [
      "", "getting-started", "authentication", "billing",
      "teams", "deployment", "api-keys", "env-vars", "schema",
    ];
    for (const page of docsPages) {
      const path = page ? `src/app/(marketing)/docs/${page}/page.tsx` : "src/app/(marketing)/docs/page.tsx";
      expect(fs.existsSync(path)).toBe(true);
    }
  });
});
