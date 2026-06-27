import { describe, it, expect } from "vitest";
import { generateApiKey, hashApiKey } from "@/lib/api-key";

describe("generateApiKey", () => {
  it("generates a key with sk_ prefix", () => {
    const { key } = generateApiKey();
    expect(key).toMatch(/^sk_[a-f0-9]{64}$/);
  });

  it("generates a SHA-256 hash", () => {
    const { hash } = generateApiKey();
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("generates a preview", () => {
    const { preview, key } = generateApiKey();
    expect(preview).toContain("...");
    expect(preview.startsWith(key.slice(0, 7))).toBe(true);
    expect(preview.endsWith(key.slice(-4))).toBe(true);
  });

  it("generates unique keys", () => {
    const keys = new Set(Array.from({ length: 100 }, () => generateApiKey().key));
    expect(keys.size).toBe(100);
  });

  it("key and hash are consistent", () => {
    const { key, hash } = generateApiKey();
    expect(hashApiKey(key)).toBe(hash);
  });
});

describe("hashApiKey", () => {
  it("produces consistent hashes", () => {
    const key = "sk_test123";
    expect(hashApiKey(key)).toBe(hashApiKey(key));
  });

  it("produces different hashes for different keys", () => {
    expect(hashApiKey("sk_aaa")).not.toBe(hashApiKey("sk_bbb"));
  });

  it("produces a 64-character hex string", () => {
    const hash = hashApiKey("sk_test");
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("handles empty string", () => {
    const hash = hashApiKey("");
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it("handles special characters", () => {
    const hash = hashApiKey("sk_test!@#$%^&*()");
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });
});
