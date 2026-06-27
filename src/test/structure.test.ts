import { describe, it, expect } from "vitest";

describe("API Route Structure", () => {
  it("auth route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/auth/[...all]/route.ts")).toBe(true);
  });

  it("stripe webhook route exists", async () => {
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

  it("health route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/health/route.ts")).toBe(true);
  });

  it("users API route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/v1/users/me/route.ts")).toBe(true);
  });

  it("teams API route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/v1/teams/route.ts")).toBe(true);
  });

  it("notifications API route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/v1/notifications/route.ts")).toBe(true);
  });

  it("webhooks API route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/v1/webhooks/route.ts")).toBe(true);
  });

  it("OG image route exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/og/route.tsx")).toBe(true);
  });
});

describe("Page Structure", () => {
  it("landing page exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/page.tsx")).toBe(true);
  });

  it("login page exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/(auth)/login/page.tsx")).toBe(true);
  });

  it("register page exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/(auth)/register/page.tsx")).toBe(true);
  });

  it("dashboard page exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/(dashboard)/dashboard/page.tsx")).toBe(true);
  });

  it("pricing page exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/(marketing)/pricing/page.tsx")).toBe(true);
  });

  it("docs pages exist", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/(marketing)/docs/page.tsx")).toBe(true);
    expect(fs.existsSync("src/app/(marketing)/docs/getting-started/page.tsx")).toBe(true);
    expect(fs.existsSync("src/app/(marketing)/docs/authentication/page.tsx")).toBe(true);
    expect(fs.existsSync("src/app/(marketing)/docs/billing/page.tsx")).toBe(true);
  });

  it("admin page exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/(dashboard)/admin/page.tsx")).toBe(true);
  });

  it("analytics page exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/(dashboard)/analytics/page.tsx")).toBe(true);
  });
});

describe("Component Structure", () => {
  it("navbar exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/navbar.tsx")).toBe(true);
  });

  it("footer exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/footer.tsx")).toBe(true);
  });

  it("theme toggle exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/theme-toggle.tsx")).toBe(true);
  });

  it("command menu exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/command-menu.tsx")).toBe(true);
  });

  it("data table exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/data-table.tsx")).toBe(true);
  });

  it("error boundary exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/components/shared/error-boundary.tsx")).toBe(true);
  });
});
