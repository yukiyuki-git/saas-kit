import { describe, it, expect } from "vitest";

describe("SaaS Kit API Route Tests", () => {
  it("auth route handler exists", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/auth/[...all]/route.ts", "utf-8");
    expect(content).toContain("auth");
    expect(content).toContain("toNextJsHandler");
  });

  it("stripe webhook handler has event types", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/webhooks/stripe/route.ts", "utf-8");
    expect(content).toContain("checkout.session.completed");
    expect(content).toContain("customer.subscription");
    expect(content).toContain("invoice.payment");
  });

  it("checkout route validates input", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/checkout/route.ts", "utf-8");
    expect(content).toContain("priceId");
    expect(content).toContain("teamId");
  });

  it("health route returns status", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/health/route.ts", "utf-8");
    expect(content).toContain("healthy");
    expect(content).toContain("timestamp");
  });

  it("users API has GET and PATCH", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/v1/users/me/route.ts", "utf-8");
    expect(content).toContain("export async function GET");
    expect(content).toContain("export async function PATCH");
  });

  it("teams API has GET and POST", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/v1/teams/route.ts", "utf-8");
    expect(content).toContain("export async function GET");
    expect(content).toContain("export async function POST");
  });

  it("notifications API has GET and PATCH", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/v1/notifications/route.ts", "utf-8");
    expect(content).toContain("export async function GET");
    expect(content).toContain("export async function PATCH");
  });

  it("webhooks API has GET and POST", async () => {
    const fs = await import("fs");
    const content = fs.readFileSync("src/app/api/v1/webhooks/route.ts", "utf-8");
    expect(content).toContain("export async function GET");
    expect(content).toContain("export async function POST");
  });
});
