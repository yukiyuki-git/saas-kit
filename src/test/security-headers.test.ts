import { describe, it, expect } from "vitest";
import { addSecurityHeaders } from "@/lib/security-headers";
import { NextResponse } from "next/server";

describe("Security Headers", () => {
  function createMockResponse() {
    const response = NextResponse.json({});
    return response;
  }

  it("sets X-Content-Type-Options header", () => {
    const response = createMockResponse();
    addSecurityHeaders(response);
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });

  it("sets X-Frame-Options header", () => {
    const response = createMockResponse();
    addSecurityHeaders(response);
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
  });

  it("sets X-XSS-Protection header", () => {
    const response = createMockResponse();
    addSecurityHeaders(response);
    expect(response.headers.get("X-XSS-Protection")).toBe("1; mode=block");
  });

  it("sets Referrer-Policy header", () => {
    const response = createMockResponse();
    addSecurityHeaders(response);
    expect(response.headers.get("Referrer-Policy")).toBe(
      "strict-origin-when-cross-origin"
    );
  });

  it("sets Permissions-Policy header", () => {
    const response = createMockResponse();
    addSecurityHeaders(response);
    const policy = response.headers.get("Permissions-Policy");
    expect(policy).toContain("camera=()");
    expect(policy).toContain("microphone=()");
    expect(policy).toContain("geolocation=()");
  });

  it("sets Content-Security-Policy header", () => {
    const response = createMockResponse();
    addSecurityHeaders(response);
    const csp = response.headers.get("Content-Security-Policy");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("frame-src 'self'");
  });

  it("sets Strict-Transport-Security header", () => {
    const response = createMockResponse();
    addSecurityHeaders(response);
    const hsts = response.headers.get("Strict-Transport-Security");
    expect(hsts).toContain("max-age=63072000");
    expect(hsts).toContain("includeSubDomains");
    expect(hsts).toContain("preload");
  });

  it("returns the response object", () => {
    const response = createMockResponse();
    const result = addSecurityHeaders(response);
    expect(result).toBe(response);
  });
});
