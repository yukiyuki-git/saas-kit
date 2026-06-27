import { describe, it, expect } from "vitest";

describe("SaaS Kit Validation Schemas Complete", () => {
  it("updateUserSchema validates correctly", async () => {
    const { updateUserSchema } = await import("@/lib/validations");
    expect(updateUserSchema.safeParse({ name: "John" }).success).toBe(true);
    expect(updateUserSchema.safeParse({ name: "J" }).success).toBe(false);
    expect(updateUserSchema.safeParse({}).success).toBe(true);
  });

  it("createTeamSchema requires name", async () => {
    const { createTeamSchema } = await import("@/lib/validations");
    expect(createTeamSchema.safeParse({ name: "Team" }).success).toBe(true);
    expect(createTeamSchema.safeParse({ name: "" }).success).toBe(false);
    expect(createTeamSchema.safeParse({}).success).toBe(false);
  });

  it("inviteMemberSchema validates email", async () => {
    const { inviteMemberSchema } = await import("@/lib/validations");
    expect(inviteMemberSchema.safeParse({ email: "test@example.com" }).success).toBe(true);
    expect(inviteMemberSchema.safeParse({ email: "invalid" }).success).toBe(false);
  });

  it("checkoutSchema requires fields", async () => {
    const { checkoutSchema } = await import("@/lib/validations");
    expect(checkoutSchema.safeParse({ priceId: "p1", teamId: "t1" }).success).toBe(true);
    expect(checkoutSchema.safeParse({}).success).toBe(false);
  });

  it("createApiKeySchema validates name", async () => {
    const { createApiKeySchema } = await import("@/lib/validations");
    expect(createApiKeySchema.safeParse({ name: "My Key" }).success).toBe(true);
    expect(createApiKeySchema.safeParse({ name: "" }).success).toBe(false);
  });

  it("contactFormSchema validates all fields", async () => {
    const { contactFormSchema } = await import("@/lib/validations");
    expect(contactFormSchema.safeParse({
      name: "John",
      email: "john@example.com",
      subject: "Question about pricing",
      message: "I have a question about the Pro plan.",
    }).success).toBe(true);
  });

  it("paginationSchema has defaults", async () => {
    const { paginationSchema } = await import("@/lib/validations");
    const result = paginationSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("validateBody returns success for valid", async () => {
    const { validateBody, createTeamSchema } = await import("@/lib/validations");
    expect(validateBody(createTeamSchema, { name: "Team" }).success).toBe(true);
  });

  it("validateBody returns error for invalid", async () => {
    const { validateBody, createTeamSchema } = await import("@/lib/validations");
    expect(validateBody(createTeamSchema, {}).success).toBe(false);
  });
});
