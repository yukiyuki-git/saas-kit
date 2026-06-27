import { z } from "zod";

// User schemas
export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  image: z.string().url().optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Team schemas
export const createTeamSchema = z.object({
  name: z.string().min(2).max(50),
});

export const inviteMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "member"]).default("member"),
});

export const removeMemberSchema = z.object({
  userId: z.string().min(1),
});

export const updateTeamSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  logo: z.string().url().optional(),
});

// Billing schemas
export const checkoutSchema = z.object({
  priceId: z.string().min(1),
  teamId: z.string().min(1),
});

export const portalSchema = z.object({
  teamId: z.string().min(1),
});

// API Key schemas
export const createApiKeySchema = z.object({
  name: z.string().min(1).max(50),
  scopes: z.array(z.string()).optional(),
  expiresIn: z.number().positive().optional(), // days
});

export const deleteApiKeySchema = z.object({
  id: z.string().min(1),
});

// Webhook schemas
export const createWebhookSchema = z.object({
  url: z.string().url(),
  events: z.array(z.string()).min(1),
});

export const deleteWebhookSchema = z.object({
  id: z.string().min(1),
});

// Notification schemas
export const markNotificationSchema = z.union([
  z.object({ id: z.string().min(1) }),
  z.object({ readAll: z.literal(true) }),
]);

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
});

// Helper to validate request body
export function validateBody<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: result.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
  };
}
