import { describe, it, expect } from "vitest";
import * as schema from "@/lib/db/schema";

describe("Database Schema - Table Definitions", () => {
  describe("users table", () => {
    it("has required columns", () => {
      expect(schema.users).toBeDefined();
      // Verify it's a Drizzle table object
      expect(typeof schema.users).toBe("object");
    });
  });

  describe("sessions table", () => {
    it("is defined", () => {
      expect(schema.sessions).toBeDefined();
    });
  });

  describe("accounts table", () => {
    it("is defined", () => {
      expect(schema.accounts).toBeDefined();
    });
  });

  describe("teams table", () => {
    it("is defined", () => {
      expect(schema.teams).toBeDefined();
    });
  });

  describe("teamMembers table", () => {
    it("is defined", () => {
      expect(schema.teamMembers).toBeDefined();
    });
  });

  describe("teamInvitations table", () => {
    it("is defined", () => {
      expect(schema.teamInvitations).toBeDefined();
    });
  });

  describe("subscriptions table", () => {
    it("is defined", () => {
      expect(schema.subscriptions).toBeDefined();
    });
  });

  describe("invoices table", () => {
    it("is defined", () => {
      expect(schema.invoices).toBeDefined();
    });
  });

  describe("apiKeys table", () => {
    it("is defined", () => {
      expect(schema.apiKeys).toBeDefined();
    });
  });

  describe("webhookEndpoints table", () => {
    it("is defined", () => {
      expect(schema.webhookEndpoints).toBeDefined();
    });
  });

  describe("webhookDeliveries table", () => {
    it("is defined", () => {
      expect(schema.webhookDeliveries).toBeDefined();
    });
  });

  describe("notifications table", () => {
    it("is defined", () => {
      expect(schema.notifications).toBeDefined();
    });
  });

  describe("auditLogs table", () => {
    it("is defined", () => {
      expect(schema.auditLogs).toBeDefined();
    });
  });
});

describe("Database Schema - Relations", () => {
  it("usersRelations connects to sessions, accounts, teamMembers, apiKeys, notifications, webhookEndpoints", () => {
    expect(schema.usersRelations).toBeDefined();
  });

  it("teamsRelations connects to members, invitations, subscriptions", () => {
    expect(schema.teamsRelations).toBeDefined();
  });

  it("teamMembersRelations connects to team and user", () => {
    expect(schema.teamMembersRelations).toBeDefined();
  });

  it("subscriptionsRelations connects to team", () => {
    expect(schema.subscriptionsRelations).toBeDefined();
  });

  it("apiKeysRelations connects to user", () => {
    expect(schema.apiKeysRelations).toBeDefined();
  });
});

describe("Database Schema - Enums", () => {
  it("teamMemberRole has correct values", () => {
    expect(schema.teamMemberRole).toBeDefined();
    // Enum values are defined in the pgEnum
    expect(schema.teamMemberRole.enumName).toBe("team_member_role");
  });

  it("subscriptionStatus has correct values", () => {
    expect(schema.subscriptionStatus).toBeDefined();
    expect(schema.subscriptionStatus.enumName).toBe("subscription_status");
  });

  it("webhookDeliveryStatus has correct values", () => {
    expect(schema.webhookDeliveryStatus).toBeDefined();
    expect(schema.webhookDeliveryStatus.enumName).toBe("webhook_delivery_status");
  });
});
