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
import { Zap, Shield, Users, CreditCard, Globe, Code, BarChart3, Bell, Lock, Database, TestTube, Docker } from "lucide-react";

const features = [
  { icon: Shield, title: "Authentication", description: "Email/password, OAuth (Google, GitHub), magic links, 2FA, session management with Better Auth." },
  { icon: CreditCard, title: "Billing & Subscriptions", description: "Stripe integration with plans, checkout, webhooks, customer portal. Free/Pro/Enterprise tiers." },
  { icon: Users, title: "Team Management", description: "Create teams, invite members, manage roles (Owner/Admin/Member) with full RBAC." },
  { icon: Code, title: "Developer API", description: "RESTful API with API key authentication, rate limiting, pagination, and auto-generated docs." },
  { icon: Globe, title: "Internationalization", description: "Built-in i18n with English and Chinese translations. Easy to add more languages." },
  { icon: BarChart3, title: "Dashboard & Analytics", description: "Beautiful dashboard with charts (Recharts), stats cards, data tables, and activity feeds." },
  { icon: Bell, title: "Notifications", description: "In-app and email notifications with configurable preferences per notification type." },
  { icon: Lock, title: "Security", description: "CSRF, CSP headers, HSTS, rate limiting, input validation with Zod, timing-safe comparisons." },
  { icon: Database, title: "Database", description: "PostgreSQL with Drizzle ORM. Full schema with relations, enums, indexes, and seed script." },
  { icon: TestTube, title: "Testing", description: "Vitest unit tests (118 tests), Playwright E2E tests (25 tests), Storybook stories." },
  { icon: Docker, title: "DevOps", description: "Docker multi-stage build, docker-compose, GitHub Actions CI/CD, Vercel-ready." },
  { icon: Zap, title: "Extras", description: "Dark mode, command palette (⌘K), cookie consent, PWA manifest, OG images, sitemap." },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Everything Included</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A comprehensive SaaS template with everything you need to ship.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
