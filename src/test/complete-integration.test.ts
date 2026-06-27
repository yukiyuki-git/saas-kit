import { describe, it, expect } from "vitest";

describe("SaaS Kit Complete Integration", () => {
  it("all lib modules are importable", async () => {
    const modules = [
      "@/lib/utils",
      "@/lib/rbac",
      "@/lib/api-key",
      "@/lib/validations",
      "@/lib/feature-flags",
      "@/lib/webhook",
      "@/lib/security-headers",
    ];
    for (const mod of modules) {
      const imported = await import(mod);
      expect(imported).toBeDefined();
    }
  });

  it("utils has all exports", async () => {
    const { cn, slugify, formatDate, truncate } = await import("@/lib/utils");
    expect(typeof cn).toBe("function");
    expect(typeof slugify).toBe("function");
    expect(typeof formatDate).toBe("function");
    expect(typeof truncate).toBe("function");
  });

  it("rbac has all exports", async () => {
    const { hasPermission, PERMISSIONS, getTeamMembership, getUserTeams } = await import("@/lib/rbac");
    expect(typeof hasPermission).toBe("function");
    expect(typeof PERMISSIONS).toBe("object");
    expect(typeof getTeamMembership).toBe("function");
    expect(typeof getUserTeams).toBe("function");
  });

  it("api-key has all exports", async () => {
    const { generateApiKey, hashApiKey, validateApiKey } = await import("@/lib/api-key");
    expect(typeof generateApiKey).toBe("function");
    expect(typeof hashApiKey).toBe("function");
    expect(typeof validateApiKey).toBe("function");
  });

  it("validations has all schemas", async () => {
    const mod = await import("@/lib/validations");
    expect(mod.updateUserSchema).toBeDefined();
    expect(mod.createTeamSchema).toBeDefined();
    expect(mod.inviteMemberSchema).toBeDefined();
    expect(mod.checkoutSchema).toBeDefined();
    expect(mod.createApiKeySchema).toBeDefined();
    expect(mod.contactFormSchema).toBeDefined();
    expect(mod.paginationSchema).toBeDefined();
    expect(typeof mod.validateBody).toBe("function");
  });

  it("feature-flags has all exports", async () => {
    const { isEnabled, getAllFlags, enabledFlags } = await import("@/lib/feature-flags");
    expect(typeof isEnabled).toBe("function");
    expect(typeof getAllFlags).toBe("function");
    expect(typeof enabledFlags).toBe("function");
  });

  it("webhook has all exports", async () => {
    const { generateWebhookSignature, verifyWebhookSignature, sendWebhook } = await import("@/lib/webhook");
    expect(typeof generateWebhookSignature).toBe("function");
    expect(typeof verifyWebhookSignature).toBe("function");
    expect(typeof sendWebhook).toBe("function");
  });

  it("security-headers has all exports", async () => {
    const { addSecurityHeaders } = await import("@/lib/security-headers");
    expect(typeof addSecurityHeaders).toBe("function");
  });
});
