import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  max: 100,
};

export function rateLimit(
  req: NextRequest,
  config: RateLimitConfig = defaultConfig
): { success: boolean; remaining: number; resetAt: number } {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const key = `${ip}:${req.nextUrl.pathname}`;

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + config.windowMs });
    return { success: true, remaining: config.max - 1, resetAt: now + config.windowMs };
  }

  if (entry.count >= config.max) {
    return { success: false, remaining: 0, resetAt: entry.resetTime };
  }

  entry.count++;
  return { success: true, remaining: config.max - entry.count, resetAt: entry.resetTime };
}

export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  config?: RateLimitConfig
) {
  return async (req: NextRequest) => {
    const result = rateLimit(req, config);

    if (!result.success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((result.resetAt - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": (config?.max || defaultConfig.max).toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": result.resetAt.toString(),
          },
        }
      );
    }

    const response = await handler(req);
    response.headers.set("X-RateLimit-Limit", (config?.max || defaultConfig.max).toString());
    response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
    response.headers.set("X-RateLimit-Reset", result.resetAt.toString());

    return response;
  };
}
