import { describe, it, expect } from "vitest";
import {
  updateUserSchema,
  createTeamSchema,
  inviteMemberSchema,
  checkoutSchema,
  createApiKeySchema,
  contactFormSchema,
  paginationSchema,
  validateBody,
} from "@/lib/validations";

describe("Validation Schemas", () => {
  describe("updateUserSchema", () => {
    it("accepts valid data", () => {
      const result = updateUserSchema.safeParse({ name: "John Doe" });
      expect(result.success).toBe(true);
    });

    it("rejects name that is too short", () => {
      const result = updateUserSchema.safeParse({ name: "J" });
      expect(result.success).toBe(false);
    });

    it("accepts partial data", () => {
      const result = updateUserSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });

  describe("createTeamSchema", () => {
    it("accepts valid team name", () => {
      const result = createTeamSchema.safeParse({ name: "My Team" });
      expect(result.success).toBe(true);
    });

    it("rejects empty name", () => {
      const result = createTeamSchema.safeParse({ name: "" });
      expect(result.success).toBe(false);
    });

    it("rejects name that is too short", () => {
      const result = createTeamSchema.safeParse({ name: "A" });
      expect(result.success).toBe(false);
    });
  });

  describe("inviteMemberSchema", () => {
    it("accepts valid email", () => {
      const result = inviteMemberSchema.safeParse({ email: "test@example.com" });
      expect(result.success).toBe(true);
    });

    it("rejects invalid email", () => {
      const result = inviteMemberSchema.safeParse({ email: "not-an-email" });
      expect(result.success).toBe(false);
    });

    it("defaults role to member", () => {
      const result = inviteMemberSchema.safeParse({ email: "test@example.com" });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.role).toBe("member");
      }
    });
  });

  describe("checkoutSchema", () => {
    it("accepts valid data", () => {
      const result = checkoutSchema.safeParse({
        priceId: "price_123",
        teamId: "team_123",
      });
      expect(result.success).toBe(true);
    });

    it("rejects missing fields", () => {
      const result = checkoutSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe("createApiKeySchema", () => {
    it("accepts valid data", () => {
      const result = createApiKeySchema.safeParse({ name: "Production Key" });
      expect(result.success).toBe(true);
    });

    it("accepts optional scopes", () => {
      const result = createApiKeySchema.safeParse({
        name: "Test",
        scopes: ["read", "write"],
      });
      expect(result.success).toBe(true);
    });
  });

  describe("contactFormSchema", () => {
    it("accepts valid form data", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        subject: "Question about pricing",
        message: "I have a question about the Pro plan pricing.",
      });
      expect(result.success).toBe(true);
    });

    it("rejects short message", () => {
      const result = contactFormSchema.safeParse({
        name: "John",
        email: "john@example.com",
        subject: "Question",
        message: "Hi",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("paginationSchema", () => {
    it("uses defaults when empty", () => {
      const result = paginationSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
        expect(result.data.order).toBe("desc");
      }
    });

    it("accepts valid pagination", () => {
      const result = paginationSchema.safeParse({
        page: "2",
        limit: "50",
        order: "asc",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("validateBody", () => {
    it("returns success for valid data", () => {
      const result = validateBody(createTeamSchema, { name: "My Team" });
      expect(result.success).toBe(true);
    });

    it("returns error for invalid data", () => {
      const result = validateBody(createTeamSchema, { name: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeTruthy();
      }
    });
  });
});
