import { describe, it, expect } from "vitest";

describe("SaaS Kit Webhook System", () => {
  it("webhook signature is consistent", async () => {
    const { generateWebhookSignature } = await import("@/lib/webhook");
    const payload = '{"event":"test"}';
    const secret = "my_secret";
    const sig1 = generateWebhookSignature(payload, secret);
    const sig2 = generateWebhookSignature(payload, secret);
    expect(sig1).toBe(sig2);
  });

  it("webhook signature is 64 hex chars", async () => {
    const { generateWebhookSignature } = await import("@/lib/webhook");
    const sig = generateWebhookSignature("test", "secret");
    expect(sig).toMatch(/^[a-f0-9]{64}$/);
  });

  it("valid signature passes verification", async () => {
    const { generateWebhookSignature, verifyWebhookSignature } = await import("@/lib/webhook");
    const payload = '{"event":"user.created"}';
    const secret = "whsec_test123";
    const sig = generateWebhookSignature(payload, secret);
    expect(verifyWebhookSignature(payload, sig, secret)).toBe(true);
  });

  it("invalid signature fails verification", async () => {
    const { verifyWebhookSignature } = await import("@/lib/webhook");
    expect(verifyWebhookSignature("payload", "invalid", "secret")).toBe(false);
  });

  it("different payloads produce different signatures", async () => {
    const { generateWebhookSignature } = await import("@/lib/webhook");
    const sig1 = generateWebhookSignature("payload1", "secret");
    const sig2 = generateWebhookSignature("payload2", "secret");
    expect(sig1).not.toBe(sig2);
  });

  it("different secrets produce different signatures", async () => {
    const { generateWebhookSignature } = await import("@/lib/webhook");
    const sig1 = generateWebhookSignature("payload", "secret1");
    const sig2 = generateWebhookSignature("payload", "secret2");
    expect(sig1).not.toBe(sig2);
  });
});
