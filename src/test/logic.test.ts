import { describe, it, expect } from "vitest";

describe("Rate Limiting Logic", () => {
  // Test the rate limiting concept
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  function checkRateLimit(key: string, max: number, windowMs: number) {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetTime) {
      rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remaining: max - 1 };
    }

    if (entry.count >= max) {
      return { allowed: false, remaining: 0 };
    }

    entry.count++;
    return { allowed: true, remaining: max - entry.count };
  }

  beforeEach(() => {
    rateLimitMap.clear();
  });

  it("allows requests within limit", () => {
    const result = checkRateLimit("test1", 5, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("blocks requests exceeding limit", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("test2", 5, 60000);
    }
    const result = checkRateLimit("test2", 5, 60000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("tracks remaining correctly", () => {
    const r1 = checkRateLimit("test3", 3, 60000);
    expect(r1.remaining).toBe(2);
    const r2 = checkRateLimit("test3", 3, 60000);
    expect(r2.remaining).toBe(1);
    const r3 = checkRateLimit("test3", 3, 60000);
    expect(r3.remaining).toBe(0);
  });
});

describe("API Key Validation Logic", () => {
  function validateApiKeyFormat(key: string): boolean {
    return /^sk_[a-f0-9]{64}$/.test(key);
  }

  it("accepts valid API key format", () => {
    expect(validateApiKeyFormat("sk_" + "a".repeat(64))).toBe(true);
  });

  it("rejects keys without prefix", () => {
    expect(validateApiKeyFormat("a".repeat(64))).toBe(false);
  });

  it("rejects keys that are too short", () => {
    expect(validateApiKeyFormat("sk_abc")).toBe(false);
  });

  it("rejects keys with invalid characters", () => {
    expect(validateApiKeyFormat("sk_" + "g".repeat(64))).toBe(false);
  });
});

describe("Pagination Logic", () => {
  function paginate<T>(items: T[], page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      items: items.slice(start, end),
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit),
    };
  }

  it("returns correct page", () => {
    const items = Array.from({ length: 100 }, (_, i) => i);
    const result = paginate(items, 1, 10);
    expect(result.items.length).toBe(10);
    expect(result.items[0]).toBe(0);
    expect(result.totalPages).toBe(10);
  });

  it("handles last page", () => {
    const items = Array.from({ length: 25 }, (_, i) => i);
    const result = paginate(items, 3, 10);
    expect(result.items.length).toBe(5);
  });

  it("handles empty results", () => {
    const result = paginate([], 1, 10);
    expect(result.items.length).toBe(0);
    expect(result.totalPages).toBe(0);
  });
});
