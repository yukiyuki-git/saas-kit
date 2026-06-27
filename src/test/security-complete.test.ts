import { describe, it, expect } from "vitest";

describe("SaaS Kit Security", () => {
  it("security headers module exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/lib/security-headers.ts")).toBe(true);
  });

  it("security headers sets CSP", async () => {
    const { addSecurityHeaders } = await import("@/lib/security-headers");
    const { NextResponse } = await import("next/server");
    const response = NextResponse.json({});
    addSecurityHeaders(response);
    const csp = response.headers.get("Content-Security-Policy");
    expect(csp).toContain("default-src 'self'");
  });

  it("security headers sets HSTS", async () => {
    const { addSecurityHeaders } = await import("@/lib/security-headers");
    const { NextResponse } = await import("next/server");
    const response = NextResponse.json({});
    addSecurityHeaders(response);
    const hsts = response.headers.get("Strict-Transport-Security");
    expect(hsts).toContain("max-age");
  });

  it("security headers sets X-Frame-Options", async () => {
    const { addSecurityHeaders } = await import("@/lib/security-headers");
    const { NextResponse } = await import("next/server");
    const response = NextResponse.json({});
    addSecurityHeaders(response);
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
  });

  it("middleware has auth protection", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/middleware.ts", "utf-8");
    expect(content).toContain("publicRoutes");
    expect(content).toContain("sessionCookie");
  });
});

describe("SaaS Kit API Routes", () => {
  it("has auth handler", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/auth/[...all]/route.ts")).toBe(true);
  });

  it("has stripe webhook", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/webhooks/stripe/route.ts")).toBe(true);
  });

  it("has checkout route", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/checkout/route.ts")).toBe(true);
  });

  it("has portal route", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/portal/route.ts")).toBe(true);
  });

  it("has health endpoint", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/health/route.ts")).toBe(true);
  });

  it("has users API", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/v1/users/me/route.ts")).toBe(true);
  });

  it("has teams API", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/v1/teams/route.ts")).toBe(true);
  });

  it("has notifications API", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/v1/notifications/route.ts")).toBe(true);
  });

  it("has webhooks API", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("src/app/api/v1/webhooks/route.ts")).toBe(true);
  });
});
