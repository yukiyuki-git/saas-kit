import { describe, it, expect } from "vitest";

describe("SaaS Kit RBAC Complete", () => {
  it("owner has all permissions", async () => {
    const { hasPermission } = await import("@/lib/rbac");
    expect(hasPermission("owner", "owner")).toBe(true);
    expect(hasPermission("owner", "admin")).toBe(true);
    expect(hasPermission("owner", "member")).toBe(true);
  });

  it("admin has admin and member permissions", async () => {
    const { hasPermission } = await import("@/lib/rbac");
    expect(hasPermission("admin", "owner")).toBe(false);
    expect(hasPermission("admin", "admin")).toBe(true);
    expect(hasPermission("admin", "member")).toBe(true);
  });

  it("member has only member permissions", async () => {
    const { hasPermission } = await import("@/lib/rbac");
    expect(hasPermission("member", "owner")).toBe(false);
    expect(hasPermission("member", "admin")).toBe(false);
    expect(hasPermission("member", "member")).toBe(true);
  });

  it("PERMISSIONS has correct values", async () => {
    const { PERMISSIONS } = await import("@/lib/rbac");
    expect(PERMISSIONS.MANAGE_BILLING).toBe("owner");
    expect(PERMISSIONS.DELETE_TEAM).toBe("owner");
    expect(PERMISSIONS.TRANSFER_OWNERSHIP).toBe("owner");
    expect(PERMISSIONS.INVITE_MEMBERS).toBe("admin");
    expect(PERMISSIONS.REMOVE_MEMBERS).toBe("admin");
    expect(PERMISSIONS.MANAGE_SETTINGS).toBe("admin");
    expect(PERMISSIONS.VIEW_DASHBOARD).toBe("member");
    expect(PERMISSIONS.USE_FEATURES).toBe("member");
  });
});

describe("SaaS Kit API Key Complete", () => {
  it("generates valid key format", async () => {
    const { generateApiKey } = await import("@/lib/api-key");
    const { key, hash, preview } = generateApiKey();
    expect(key).toMatch(/^sk_[a-f0-9]{64}$/);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(preview).toContain("...");
  });

  it("hash is consistent", async () => {
    const { hashApiKey } = await import("@/lib/api-key");
    const hash1 = hashApiKey("sk_test");
    const hash2 = hashApiKey("sk_test");
    expect(hash1).toBe(hash2);
  });

  it("different keys produce different hashes", async () => {
    const { hashApiKey } = await import("@/lib/api-key");
    expect(hashApiKey("sk_aaa")).not.toBe(hashApiKey("sk_bbb"));
  });
});

describe("SaaS Kit Rate Limit", () => {
  it("rateLimit function exists", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    expect(typeof rateLimit).toBe("function");
  });

  it("withRateLimit function exists", async () => {
    const { withRateLimit } = await import("@/lib/rate-limit");
    expect(typeof withRateLimit).toBe("function");
  });
});
