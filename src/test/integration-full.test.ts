import { describe, it, expect } from "vitest";

describe("SaaS Kit Integration Tests", () => {
  it("all lib files export expected functions", async () => {
    const utils = await import("@/lib/utils");
    expect(utils.cn).toBeDefined();
    expect(utils.slugify).toBeDefined();
    expect(utils.formatDate).toBeDefined();
    expect(utils.truncate).toBeDefined();
  });

  it("validations module has all schemas", async () => {
    const validations = await import("@/lib/validations");
    expect(validations.updateUserSchema).toBeDefined();
    expect(validations.createTeamSchema).toBeDefined();
    expect(validations.inviteMemberSchema).toBeDefined();
    expect(validations.checkoutSchema).toBeDefined();
    expect(validations.createApiKeySchema).toBeDefined();
    expect(validations.contactFormSchema).toBeDefined();
    expect(validations.paginationSchema).toBeDefined();
    expect(validations.validateBody).toBeDefined();
  });

  it("feature flags module works correctly", async () => {
    const flags = await import("@/lib/feature-flags");
    expect(typeof flags.isEnabled("dark_mode")).toBe("boolean");
    expect(typeof flags.getAllFlags()).toBe("object");
    expect(Array.isArray(flags.enabledFlags())).toBe(true);
  });

  it("webhook module has correct exports", async () => {
    const webhook = await import("@/lib/webhook");
    expect(webhook.generateWebhookSignature).toBeDefined();
    expect(webhook.verifyWebhookSignature).toBeDefined();
    expect(webhook.sendWebhook).toBeDefined();
  });

  it("rate limit module works", async () => {
    const rateLimit = await import("@/lib/rate-limit");
    expect(rateLimit.rateLimit).toBeDefined();
    expect(rateLimit.withRateLimit).toBeDefined();
  });

  it("stripe module has PLANS", async () => {
    const stripe = await import("@/lib/stripe");
    expect(stripe.PLANS).toBeDefined();
    expect(stripe.PLANS.free).toBeDefined();
    expect(stripe.PLANS.pro).toBeDefined();
    expect(stripe.PLANS.enterprise).toBeDefined();
  });

  it("rbac module has correct exports", async () => {
    const rbac = await import("@/lib/rbac");
    expect(rbac.hasPermission).toBeDefined();
    expect(rbac.PERMISSIONS).toBeDefined();
  });

  it("api-key module works", async () => {
    const apiKey = await import("@/lib/api-key");
    expect(apiKey.generateApiKey).toBeDefined();
    expect(apiKey.hashApiKey).toBeDefined();
    expect(apiKey.validateApiKey).toBeDefined();
  });

  it("security headers module works", async () => {
    const security = await import("@/lib/security-headers");
    expect(security.addSecurityHeaders).toBeDefined();
  });
});
