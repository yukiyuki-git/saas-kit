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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const envVars = [
  { name: "DATABASE_URL", required: true, description: "PostgreSQL connection string", example: "postgresql://user:pass@localhost:5432/saas_kit", category: "Database" },
  { name: "BETTER_AUTH_SECRET", required: true, description: "Secret key for authentication (min 32 chars)", example: "your-super-secret-key-here-at-least-32-chars", category: "Auth" },
  { name: "BETTER_AUTH_URL", required: false, description: "Base URL for auth callbacks", example: "http://localhost:3000", category: "Auth" },
  { name: "STRIPE_SECRET_KEY", required: true, description: "Stripe secret API key", example: "sk_test_...", category: "Billing" },
  { name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", required: true, description: "Stripe publishable key", example: "pk_test_...", category: "Billing" },
  { name: "STRIPE_WEBHOOK_SECRET", required: true, description: "Stripe webhook endpoint secret", example: "whsec_...", category: "Billing" },
  { name: "STRIPE_PRO_PRICE_ID", required: false, description: "Stripe price ID for Pro plan", example: "price_...", category: "Billing" },
  { name: "STRIPE_ENTERPRISE_PRICE_ID", required: false, description: "Stripe price ID for Enterprise plan", example: "price_...", category: "Billing" },
  { name: "RESEND_API_KEY", required: true, description: "Resend email API key", example: "re_...", category: "Email" },
  { name: "EMAIL_FROM", required: false, description: "Sender email address", example: "noreply@yourdomain.com", category: "Email" },
  { name: "NEXT_PUBLIC_APP_URL", required: true, description: "Your application URL", example: "http://localhost:3000", category: "App" },
  { name: "REDIS_URL", required: false, description: "Redis connection string for rate limiting", example: "redis://localhost:6379", category: "Cache" },
  { name: "GITHUB_CLIENT_ID", required: false, description: "GitHub OAuth client ID", example: "Iv1...", category: "OAuth" },
  { name: "GITHUB_CLIENT_SECRET", required: false, description: "GitHub OAuth client secret", example: "abc123...", category: "OAuth" },
  { name: "GOOGLE_CLIENT_ID", required: false, description: "Google OAuth client ID", example: "123456.apps.googleusercontent.com", category: "OAuth" },
  { name: "GOOGLE_CLIENT_SECRET", required: false, description: "Google OAuth client secret", example: "GOCSPX-...", category: "OAuth" },
  { name: "SENTRY_DSN", required: false, description: "Sentry DSN for error tracking", example: "https://...@sentry.io/...", category: "Monitoring" },
  { name: "POSTHOG_KEY", required: false, description: "PostHog project API key", example: "phc_...", category: "Analytics" },
];

const categories = [...new Set(envVars.map((v) => v.category))];

export default function EnvVarsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Reference
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Environment Variables</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Complete reference of all environment variables used by SaaS Kit.
          </p>

          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variable</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Example</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {envVars
                        .filter((v) => v.category === category)
                        .map((envVar) => (
                          <TableRow key={envVar.name}>
                            <TableCell>
                              <code className="text-sm bg-muted px-1 rounded">
                                {envVar.name}
                              </code>
                            </TableCell>
                            <TableCell>
                              <Badge variant={envVar.required ? "default" : "secondary"}>
                                {envVar.required ? "Required" : "Optional"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {envVar.description}
                            </TableCell>
                            <TableCell>
                              <code className="text-xs text-muted-foreground">
                                {envVar.example}
                              </code>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
