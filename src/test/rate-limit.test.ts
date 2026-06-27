import { describe, it, expect, beforeEach } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

// Create a mock NextRequest
function createMockRequest(path = "/api/test") {
  return {
    headers: {
      get: (name: string) => {
        if (name === "x-forwarded-for") return "127.0.0.1";
        return null;
      },
    },
    nextUrl: { pathname: path },
  } as Parameters<typeof rateLimit>[0];
}

describe("rateLimit", () => {
  beforeEach(() => {
    // Clear rate limit map between tests by waiting
  });

  it("allows requests within limit", () => {
    const req = createMockRequest();
    const result = rateLimit(req, { windowMs: 60000, max: 5 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("blocks requests exceeding limit", () => {
    const req = createMockRequest("/api/test-block");
    for (let i = 0; i < 5; i++) {
      rateLimit(req, { windowMs: 60000, max: 5 });
    }
    const result = rateLimit(req, { windowMs: 60000, max: 5 });
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("tracks remaining correctly", () => {
    const req = createMockRequest("/api/test-remaining");
    const config = { windowMs: 60000, max: 3 };

    const r1 = rateLimit(req, config);
    expect(r1.remaining).toBe(2);

    const r2 = rateLimit(req, config);
    expect(r2.remaining).toBe(1);

    const r3 = rateLimit(req, config);
    expect(r3.remaining).toBe(0);
  });

  it("separates limits by IP and path", () => {
    const req1 = createMockRequest("/api/path-a");
    const req2 = createMockRequest("/api/path-b");

    rateLimit(req1, { windowMs: 60000, max: 1 });
    const result = rateLimit(req2, { windowMs: 60000, max: 1 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(0);
  });

  it("uses default config when not provided", () => {
    const req = createMockRequest("/api/default");
    const result = rateLimit(req);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(99); // Default max is 100
  });
});
