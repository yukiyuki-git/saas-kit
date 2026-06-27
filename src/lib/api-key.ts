import { db } from "@/lib/db";
import { apiKeys, users } from "@/lib/db/schema";
import { eq, and, gt, or, isNull } from "drizzle-orm";
import { createHash, randomBytes } from "crypto";

export function generateApiKey(): { key: string; hash: string; preview: string } {
  const key = `sk_${randomBytes(32).toString("hex")}`;
  const hash = createHash("sha256").update(key).digest("hex");
  const preview = `${key.slice(0, 7)}...${key.slice(-4)}`;
  return { key, hash, preview };
}

export function hashApiKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export async function validateApiKey(key: string) {
  const hash = hashApiKey(key);

  const [apiKey] = await db
    .select({
      id: apiKeys.id,
      userId: apiKeys.userId,
      scopes: apiKeys.scopes,
      expiresAt: apiKeys.expiresAt,
    })
    .from(apiKeys)
    .where(
      and(
        eq(apiKeys.keyHash, hash),
        or(isNull(apiKeys.expiresAt), gt(apiKeys.expiresAt, new Date()))
      )
    )
    .limit(1);

  if (!apiKey) return null;

  // Update last used
  await db
    .update(apiKeys)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiKeys.id, apiKey.id));

  // Get user
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, apiKey.userId))
    .limit(1);

  return { apiKey, user };
}
