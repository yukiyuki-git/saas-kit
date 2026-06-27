import { createHmac, timingSafeEqual } from "crypto";

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function generateWebhookSignature(
  payload: string,
  secret: string
): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export async function sendWebhook(
  url: string,
  event: string,
  data: Record<string, unknown>,
  secret: string
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  const payload = JSON.stringify({
    event,
    data,
    timestamp: new Date().toISOString(),
  });

  const signature = generateWebhookSignature(payload, secret);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": signature,
        "X-Webhook-Event": event,
      },
      body: payload,
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    return {
      success: response.ok,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
