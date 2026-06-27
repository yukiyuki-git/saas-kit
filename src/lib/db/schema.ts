import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const teamMemberRole = pgEnum("team_member_role", [
  "owner",
  "admin",
  "member",
]);

export const subscriptionStatus = pgEnum("subscription_status", [
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "paused",
  "trialing",
  "unpaid",
]);

export const webhookDeliveryStatus = pgEnum("webhook_delivery_status", [
  "pending",
  "success",
  "failed",
]);

// ─── Users & Auth ────────────────────────────────────────────────────────────

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("users_email_idx").on(table.email)]
);

export const sessions = pgTable(
  "sessions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("sessions_user_id_idx").on(table.userId),
    uniqueIndex("sessions_token_idx").on(table.token),
  ]
);

export const accounts = pgTable(
  "accounts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("accounts_user_id_idx").on(table.userId),
    uniqueIndex("accounts_provider_idx").on(table.providerId, table.accountId),
  ]
);

export const verifications = pgTable(
  "verifications",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)]
);

// ─── Teams ───────────────────────────────────────────────────────────────────

export const teams = pgTable("teams", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const teamMembers = pgTable(
  "team_members",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: teamMemberRole("role").notNull().default("member"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("team_members_team_user_idx").on(table.teamId, table.userId),
    index("team_members_user_id_idx").on(table.userId),
  ]
);

export const teamInvitations = pgTable(
  "team_invitations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: teamMemberRole("role").notNull().default("member"),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("team_invitations_team_id_idx").on(table.teamId),
    uniqueIndex("team_invitations_token_idx").on(table.token),
  ]
);

// ─── Billing ─────────────────────────────────────────────────────────────────

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
    stripeCustomerId: text("stripe_customer_id").notNull(),
    stripePriceId: text("stripe_price_id").notNull(),
    status: subscriptionStatus("status").notNull(),
    currentPeriodStart: timestamp("current_period_start").notNull(),
    currentPeriodEnd: timestamp("current_period_end").notNull(),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("subscriptions_team_id_idx").on(table.teamId),
    uniqueIndex("subscriptions_stripe_id_idx").on(table.stripeSubscriptionId),
  ]
);

export const invoices = pgTable(
  "invoices",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    stripeInvoiceId: text("stripe_invoice_id").notNull().unique(),
    amount: integer("amount").notNull(),
    status: text("status").notNull(),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("invoices_team_id_idx").on(table.teamId),
    uniqueIndex("invoices_stripe_id_idx").on(table.stripeInvoiceId),
  ]
);

// ─── Developer Tools ─────────────────────────────────────────────────────────

export const apiKeys = pgTable(
  "api_keys",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    keyHash: text("key_hash").notNull().unique(),
    keyPreview: text("key_preview").notNull(),
    scopes: jsonb("scopes").$type<string[]>().default([]),
    lastUsedAt: timestamp("last_used_at"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("api_keys_user_id_idx").on(table.userId),
    uniqueIndex("api_keys_hash_idx").on(table.keyHash),
  ]
);

export const webhookEndpoints = pgTable(
  "webhook_endpoints",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    events: jsonb("events").$type<string[]>().notNull().default([]),
    secret: text("secret").notNull(),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("webhook_endpoints_user_id_idx").on(table.userId)]
);

export const webhookDeliveries = pgTable(
  "webhook_deliveries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    endpointId: text("endpoint_id")
      .notNull()
      .references(() => webhookEndpoints.id, { onDelete: "cascade" }),
    event: text("event").notNull(),
    payload: jsonb("payload").notNull(),
    status: webhookDeliveryStatus("status").notNull().default("pending"),
    responseCode: integer("response_code"),
    responseBody: text("response_body"),
    attempts: integer("attempts").notNull().default(0),
    nextRetryAt: timestamp("next_retry_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("webhook_deliveries_endpoint_id_idx").on(table.endpointId),
    index("webhook_deliveries_status_idx").on(table.status),
  ]
);

// ─── Notifications & Audit ───────────────────────────────────────────────────

export const notifications = pgTable(
  "notifications",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    title: text("title").notNull(),
    message: text("message").notNull(),
    read: boolean("read").notNull().default(false),
    data: jsonb("data"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("notifications_user_id_idx").on(table.userId),
    index("notifications_read_idx").on(table.read),
  ]
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    teamId: text("team_id").references(() => teams.id, {
      onDelete: "set null",
    }),
    action: text("action").notNull(),
    resource: text("resource").notNull(),
    resourceId: text("resource_id"),
    metadata: jsonb("metadata"),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("audit_logs_user_id_idx").on(table.userId),
    index("audit_logs_team_id_idx").on(table.teamId),
    index("audit_logs_created_at_idx").on(table.createdAt),
  ]
);

// ─── Relations ───────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  teamMembers: many(teamMembers),
  apiKeys: many(apiKeys),
  notifications: many(notifications),
  webhookEndpoints: many(webhookEndpoints),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(teamMembers),
  invitations: many(teamInvitations),
  subscriptions: many(subscriptions),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, { fields: [teamMembers.teamId], references: [teams.id] }),
  user: one(users, { fields: [teamMembers.userId], references: [users.id] }),
}));

export const teamInvitationsRelations = relations(
  teamInvitations,
  ({ one }) => ({
    team: one(teams, {
      fields: [teamInvitations.teamId],
      references: [teams.id],
    }),
  })
);

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  team: one(teams, {
    fields: [subscriptions.teamId],
    references: [teams.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  team: one(teams, { fields: [invoices.teamId], references: [teams.id] }),
}));

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  user: one(users, { fields: [apiKeys.userId], references: [users.id] }),
}));

export const webhookEndpointsRelations = relations(
  webhookEndpoints,
  ({ one, many }) => ({
    user: one(users, {
      fields: [webhookEndpoints.userId],
      references: [users.id],
    }),
    deliveries: many(webhookDeliveries),
  })
);

export const webhookDeliveriesRelations = relations(
  webhookDeliveries,
  ({ one }) => ({
    endpoint: one(webhookEndpoints, {
      fields: [webhookDeliveries.endpointId],
      references: [webhookEndpoints.id],
    }),
  })
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));
