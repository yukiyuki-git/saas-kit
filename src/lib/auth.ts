import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// Use a module-level lazy init to avoid build-time DB connection errors
let _db: ReturnType<typeof import("drizzle-orm/postgres-js").drizzle> | null = null;

function getDb() {
  if (!_db) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const postgres = require("postgres");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { drizzle } = require("drizzle-orm/postgres-js");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const schema = require("@/lib/db/schema");
    const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/saas_kit";
    const client = postgres(connectionString);
    _db = drizzle(client, { schema });
  }
  return _db!;
}

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), { provider: "pg" }),
  secret: process.env.BETTER_AUTH_SECRET || "default-secret-please-set-in-env-variables",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  rateLimit: {
    window: 60,
    max: 10,
  },
});

export type Session = typeof auth.$Infer.Session;
