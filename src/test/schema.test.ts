import { describe, it, expect } from "vitest";

describe("Database Schema", () => {
  it("exports all required tables", async () => {
    const schema = await import("@/lib/db/schema");
    // Users & Auth
    expect(schema.users).toBeDefined();
    expect(schema.sessions).toBeDefined();
    expect(schema.accounts).toBeDefined();
    expect(schema.verifications).toBeDefined();
    // Teams
    expect(schema.teams).toBeDefined();
    expect(schema.teamMembers).toBeDefined();
    expect(schema.teamInvitations).toBeDefined();
    // Billing
    expect(schema.subscriptions).toBeDefined();
    expect(schema.invoices).toBeDefined();
    // Developer
    expect(schema.apiKeys).toBeDefined();
    expect(schema.webhookEndpoints).toBeDefined();
    expect(schema.webhookDeliveries).toBeDefined();
    // System
    expect(schema.notifications).toBeDefined();
    expect(schema.auditLogs).toBeDefined();
  });

  it("exports all required relations", async () => {
    const schema = await import("@/lib/db/schema");
    expect(schema.usersRelations).toBeDefined();
    expect(schema.sessionsRelations).toBeDefined();
    expect(schema.accountsRelations).toBeDefined();
    expect(schema.teamsRelations).toBeDefined();
    expect(schema.teamMembersRelations).toBeDefined();
    expect(schema.teamInvitationsRelations).toBeDefined();
    expect(schema.subscriptionsRelations).toBeDefined();
    expect(schema.invoicesRelations).toBeDefined();
    expect(schema.apiKeysRelations).toBeDefined();
    expect(schema.webhookEndpointsRelations).toBeDefined();
    expect(schema.webhookDeliveriesRelations).toBeDefined();
    expect(schema.notificationsRelations).toBeDefined();
  });

  it("exports all required enums", async () => {
    const schema = await import("@/lib/db/schema");
    expect(schema.teamMemberRole).toBeDefined();
    expect(schema.subscriptionStatus).toBeDefined();
    expect(schema.webhookDeliveryStatus).toBeDefined();
  });
});
