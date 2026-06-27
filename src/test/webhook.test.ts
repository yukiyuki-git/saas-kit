import { describe, it, expect } from "vitest";
import { generateWebhookSignature, verifyWebhookSignature } from "@/lib/webhook";

describe("Webhook Signature", () => {
  const secret = "whsec_test_secret_key_123456";
  const payload = '{"event":"test","data":{"id":"123"}}';

  it("generates a consistent signature", () => {
    const sig1 = generateWebhookSignature(payload, secret);
    const sig2 = generateWebhookSignature(payload, secret);
    expect(sig1).toBe(sig2);
  });

  it("generates a hex string", () => {
    const sig = generateWebhookSignature(payload, secret);
    expect(sig).toMatch(/^[a-f0-9]{64}$/);
  });

  it("generates different signatures for different payloads", () => {
    const sig1 = generateWebhookSignature(payload, secret);
    const sig2 = generateWebhookSignature('{"event":"other"}', secret);
    expect(sig1).not.toBe(sig2);
  });

  it("generates different signatures for different secrets", () => {
    const sig1 = generateWebhookSignature(payload, secret);
    const sig2 = generateWebhookSignature(payload, "different_secret");
    expect(sig1).not.toBe(sig2);
  });

  it("verifies a valid signature", () => {
    const sig = generateWebhookSignature(payload, secret);
    expect(verifyWebhookSignature(payload, sig, secret)).toBe(true);
  });

  it("rejects an invalid signature", () => {
    expect(verifyWebhookSignature(payload, "invalid_signature", secret)).toBe(false);
  });

  it("rejects a tampered payload", () => {
    const sig = generateWebhookSignature(payload, secret);
    const tampered = payload.replace("123", "456");
    expect(verifyWebhookSignature(tampered, sig, secret)).toBe(false);
  });

  it("rejects a wrong secret", () => {
    const sig = generateWebhookSignature(payload, secret);
    expect(verifyWebhookSignature(payload, sig, "wrong_secret")).toBe(false);
  });
});
