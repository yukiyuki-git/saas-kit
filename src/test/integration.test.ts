import { describe, it, expect } from "vitest";

describe("SaaS Kit Utility Functions", () => {
  it("cn merges class names correctly", async () => {
    const { cn } = await import("@/lib/utils");
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("px-4", false && "hidden")).toBe("px-4");
  });

  it("slugify creates valid slugs", async () => {
    const { slugify } = await import("@/lib/utils");
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("My Team Name")).toBe("my-team-name");
  });

  it("formatDate formats dates correctly", async () => {
    const { formatDate } = await import("@/lib/utils");
    const result = formatDate(new Date("2024-01-15"));
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("truncate shortens long strings", async () => {
    const { truncate } = await import("@/lib/utils");
    expect(truncate("hello world", 5)).toBe("hello...");
    expect(truncate("hi", 5)).toBe("hi");
  });
});

describe("RBAC Permissions", () => {
  it("hasPermission works correctly", async () => {
    const { hasPermission } = await import("@/lib/rbac");
    expect(hasPermission("owner", "member")).toBe(true);
    expect(hasPermission("admin", "member")).toBe(true);
    expect(hasPermission("member", "owner")).toBe(false);
  });

  it("PERMISSIONS are defined", async () => {
    const { PERMISSIONS } = await import("@/lib/rbac");
    expect(PERMISSIONS.MANAGE_BILLING).toBe("owner");
    expect(PERMISSIONS.INVITE_MEMBERS).toBe("admin");
    expect(PERMISSIONS.VIEW_DASHBOARD).toBe("member");
  });
});

describe("Feature Flags", () => {
  it("isEnabled returns boolean", async () => {
    const { isEnabled } = await import("@/lib/feature-flags");
    expect(typeof isEnabled("dark_mode")).toBe("boolean");
    expect(typeof isEnabled("beta_features")).toBe("boolean");
  });

  it("getAllFlags returns all flags", async () => {
    const { getAllFlags } = await import("@/lib/feature-flags");
    const flags = getAllFlags();
    expect(Object.keys(flags).length).toBeGreaterThan(5);
    expect(flags).toHaveProperty("dark_mode");
  });

  it("enabledFlags returns array", async () => {
    const { enabledFlags } = await import("@/lib/feature-flags");
    const flags = enabledFlags();
    expect(Array.isArray(flags)).toBe(true);
    expect(flags.length).toBeGreaterThan(0);
  });
});

describe("Webhook Utilities", () => {
  it("generateWebhookSignature produces consistent output", async () => {
    const { generateWebhookSignature } = await import("@/lib/webhook");
    const sig1 = generateWebhookSignature("test", "secret");
    const sig2 = generateWebhookSignature("test", "secret");
    expect(sig1).toBe(sig2);
  });

  it("verifyWebhookSignature validates correctly", async () => {
    const { generateWebhookSignature, verifyWebhookSignature } = await import("@/lib/webhook");
    const payload = '{"event":"test"}';
    const secret = "my_secret";
    const sig = generateWebhookSignature(payload, secret);
    expect(verifyWebhookSignature(payload, sig, secret)).toBe(true);
    expect(verifyWebhookSignature(payload, "wrong", secret)).toBe(false);
  });
});
