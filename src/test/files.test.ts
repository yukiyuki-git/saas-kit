import { describe, it, expect } from "vitest";

describe("Environment Validation", () => {
  it("env module exports validation schema", async () => {
    // The env.ts file uses @t3-oss/env-nextjs
    // We can test that the module structure is correct
    const fs = await import("fs");
    const path = await import("path");
    const envPath = path.resolve(process.cwd(), "src/env.ts");
    const content = fs.readFileSync(envPath, "utf-8");
    expect(content).toContain("createEnv");
    expect(content).toContain("DATABASE_URL");
    expect(content).toContain("BETTER_AUTH_SECRET");
    expect(content).toContain("STRIPE_SECRET_KEY");
  });
});

describe("Database Schema Completeness", () => {
  it("schema file exports all tables", async () => {
    const schema = await import("@/lib/db/schema");
    const expectedTables = [
      "users", "sessions", "accounts", "verifications",
      "teams", "teamMembers", "teamInvitations",
      "subscriptions", "invoices",
      "apiKeys", "webhookEndpoints", "webhookDeliveries",
      "notifications", "auditLogs",
    ];
    for (const table of expectedTables) {
      expect(schema[table as keyof typeof schema]).toBeDefined();
    }
  });

  it("schema has all relations", async () => {
    const schema = await import("@/lib/db/schema");
    expect(schema.usersRelations).toBeDefined();
    expect(schema.teamsRelations).toBeDefined();
    expect(schema.teamMembersRelations).toBeDefined();
    expect(schema.subscriptionsRelations).toBeDefined();
  });

  it("schema has all enums", async () => {
    const schema = await import("@/lib/db/schema");
    expect(schema.teamMemberRole).toBeDefined();
    expect(schema.subscriptionStatus).toBeDefined();
    expect(schema.webhookDeliveryStatus).toBeDefined();
  });
});

describe("Email Templates", () => {
  it("welcome email template exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const emailPath = path.resolve(process.cwd(), "src/emails/welcome.tsx");
    expect(fs.existsSync(emailPath)).toBe(true);
    const content = fs.readFileSync(emailPath, "utf-8");
    expect(content).toContain("WelcomeEmail");
  });

  it("team invite email template exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const emailPath = path.resolve(process.cwd(), "src/emails/team-invite.tsx");
    expect(fs.existsSync(emailPath)).toBe(true);
  });

  it("password reset email template exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const emailPath = path.resolve(process.cwd(), "src/emails/password-reset.tsx");
    expect(fs.existsSync(emailPath)).toBe(true);
  });

  it("payment receipt email template exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const emailPath = path.resolve(process.cwd(), "src/emails/payment-receipt.tsx");
    expect(fs.existsSync(emailPath)).toBe(true);
  });

  it("subscription confirmation email template exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const emailPath = path.resolve(process.cwd(), "src/emails/subscription-confirmation.tsx");
    expect(fs.existsSync(emailPath)).toBe(true);
  });

  it("weekly digest email template exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const emailPath = path.resolve(process.cwd(), "src/emails/weekly-digest.tsx");
    expect(fs.existsSync(emailPath)).toBe(true);
  });
});

describe("Configuration Files", () => {
  it("drizzle config exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("drizzle.config.ts")).toBe(true);
  });

  it("docker compose exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("docker-compose.yml")).toBe(true);
  });

  it("Dockerfile exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("Dockerfile")).toBe(true);
  });

  it("CI workflow exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync(".github/workflows/ci.yml")).toBe(true);
  });

  it("env example exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync(".env.example")).toBe(true);
  });

  it("LICENSE exists", async () => {
    const fs = await import("fs");
    expect(fs.existsSync("LICENSE")).toBe(true);
  });
});
