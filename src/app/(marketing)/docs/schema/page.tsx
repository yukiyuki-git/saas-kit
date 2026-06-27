import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tables = [
  {
    name: "users",
    description: "User accounts",
    columns: [
      { name: "id", type: "text", pk: true, description: "UUID primary key" },
      { name: "name", type: "text", pk: false, description: "Display name" },
      { name: "email", type: "text", pk: false, description: "Email address (unique)" },
      { name: "emailVerified", type: "boolean", pk: false, description: "Email verification status" },
      { name: "image", type: "text", pk: false, description: "Avatar URL" },
      { name: "createdAt", type: "timestamp", pk: false, description: "Account creation date" },
      { name: "updatedAt", type: "timestamp", pk: false, description: "Last update date" },
    ],
  },
  {
    name: "teams",
    description: "Organizations/teams",
    columns: [
      { name: "id", type: "text", pk: true, description: "UUID primary key" },
      { name: "name", type: "text", pk: false, description: "Team name" },
      { name: "slug", type: "text", pk: false, description: "URL-friendly slug (unique)" },
      { name: "logo", type: "text", pk: false, description: "Logo URL" },
      { name: "createdAt", type: "timestamp", pk: false, description: "Creation date" },
    ],
  },
  {
    name: "team_members",
    description: "Team membership with roles",
    columns: [
      { name: "id", type: "text", pk: true, description: "UUID primary key" },
      { name: "teamId", type: "text", pk: false, description: "Foreign key to teams" },
      { name: "userId", type: "text", pk: false, description: "Foreign key to users" },
      { name: "role", type: "enum", pk: false, description: "owner | admin | member" },
      { name: "createdAt", type: "timestamp", pk: false, description: "Join date" },
    ],
  },
  {
    name: "team_invitations",
    description: "Pending team invitations",
    columns: [
      { name: "id", type: "text", pk: true, description: "UUID primary key" },
      { name: "teamId", type: "text", pk: false, description: "Foreign key to teams" },
      { name: "email", type: "text", pk: false, description: "Invitee email" },
      { name: "role", type: "enum", pk: false, description: "Invited role" },
      { name: "token", type: "text", pk: false, description: "Invitation token (unique)" },
      { name: "expiresAt", type: "timestamp", pk: false, description: "Expiration date" },
    ],
  },
  {
    name: "subscriptions",
    description: "Stripe subscriptions",
    columns: [
      { name: "id", type: "text", pk: true, description: "UUID primary key" },
      { name: "teamId", type: "text", pk: false, description: "Foreign key to teams" },
      { name: "stripeSubscriptionId", type: "text", pk: false, description: "Stripe subscription ID (unique)" },
      { name: "stripeCustomerId", type: "text", pk: false, description: "Stripe customer ID" },
      { name: "stripePriceId", type: "text", pk: false, description: "Stripe price ID" },
      { name: "status", type: "enum", pk: false, description: "Subscription status" },
      { name: "currentPeriodStart", type: "timestamp", pk: false, description: "Period start" },
      { name: "currentPeriodEnd", type: "timestamp", pk: false, description: "Period end" },
      { name: "cancelAtPeriodEnd", type: "boolean", pk: false, description: "Cancel at period end" },
    ],
  },
  {
    name: "api_keys",
    description: "API key management",
    columns: [
      { name: "id", type: "text", pk: true, description: "UUID primary key" },
      { name: "userId", type: "text", pk: false, description: "Foreign key to users" },
      { name: "name", type: "text", pk: false, description: "Key name" },
      { name: "keyHash", type: "text", pk: false, description: "SHA-256 hash (unique)" },
      { name: "keyPreview", type: "text", pk: false, description: "Preview (sk_xxx...xxx)" },
      { name: "scopes", type: "jsonb", pk: false, description: "Permission scopes" },
      { name: "lastUsedAt", type: "timestamp", pk: false, description: "Last usage" },
      { name: "expiresAt", type: "timestamp", pk: false, description: "Expiration date" },
    ],
  },
  {
    name: "notifications",
    description: "In-app notifications",
    columns: [
      { name: "id", type: "text", pk: true, description: "UUID primary key" },
      { name: "userId", type: "text", pk: false, description: "Foreign key to users" },
      { name: "type", type: "text", pk: false, description: "Notification type" },
      { name: "title", type: "text", pk: false, description: "Title" },
      { name: "message", type: "text", pk: false, description: "Message body" },
      { name: "read", type: "boolean", pk: false, description: "Read status" },
      { name: "data", type: "jsonb", pk: false, description: "Additional data" },
    ],
  },
  {
    name: "audit_logs",
    description: "Activity audit trail",
    columns: [
      { name: "id", type: "text", pk: true, description: "UUID primary key" },
      { name: "userId", type: "text", pk: false, description: "Actor (nullable)" },
      { name: "teamId", type: "text", pk: false, description: "Team context (nullable)" },
      { name: "action", type: "text", pk: false, description: "Action performed" },
      { name: "resource", type: "text", pk: false, description: "Resource type" },
      { name: "resourceId", type: "text", pk: false, description: "Resource ID" },
      { name: "metadata", type: "jsonb", pk: false, description: "Additional context" },
      { name: "ipAddress", type: "text", pk: false, description: "IP address" },
    ],
  },
];

const typeColors: Record<string, string> = {
  text: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  boolean: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  timestamp: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  enum: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  jsonb: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

export default function SchemaDocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Reference
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Database Schema</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Complete reference of the database schema used by SaaS Kit.
            Powered by Drizzle ORM with PostgreSQL.
          </p>

          <div className="space-y-6">
            {tables.map((table) => (
              <Card key={table.name}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-semibold">{table.name}</code>
                    <Badge variant="outline">{table.columns.length} columns</Badge>
                  </div>
                  <CardDescription>{table.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {table.columns.map((col) => (
                      <div
                        key={col.name}
                        className="flex items-center gap-3 p-2 border rounded"
                      >
                        <code className="text-sm font-medium w-40">{col.name}</code>
                        <Badge className={`text-xs ${typeColors[col.type] || ""}`}>
                          {col.type}
                        </Badge>
                        {col.pk && (
                          <Badge variant="default" className="text-xs">PK</Badge>
                        )}
                        <span className="text-sm text-muted-foreground flex-1">
                          {col.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
