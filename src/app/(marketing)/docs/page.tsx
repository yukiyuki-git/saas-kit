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
import { Code, Shield, Zap, Globe } from "lucide-react";

const sections = [
  {
    icon: Code,
    title: "API Reference",
    description: "Complete API documentation with examples",
    href: "/api-docs",
  },
  {
    icon: Shield,
    title: "Authentication",
    description: "Auth methods, OAuth, 2FA, session management",
    href: "/docs/authentication",
  },
  {
    icon: Zap,
    title: "Billing",
    description: "Stripe integration, plans, webhooks",
    href: "/docs/billing",
  },
  {
    icon: Globe,
    title: "Deployment",
    description: "Vercel, Docker, VPS, CI/CD",
    href: "/docs/deployment",
  },
];

const guides = [
  { title: "Getting Started", href: "/docs/getting-started", description: "Quick setup guide" },
  { title: "Authentication", href: "/docs/authentication", description: "Auth configuration" },
  { title: "Billing", href: "/docs/billing", description: "Stripe setup" },
  { title: "Teams", href: "/docs/teams", description: "Team management" },
  { title: "Deployment", href: "/docs/deployment", description: "Deploy to production" },
  { title: "API Reference", href: "/api-docs", description: "REST API docs" },
  { title: "API Playground", href: "/api-playground", description: "Test API live" },
];

export default function DocsIndexPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Documentation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Documentation
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to build, customize, and deploy your SaaS
              application.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {sections.map((section) => (
              <Card key={section.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* All Guides */}
          <h2 className="text-2xl font-bold mb-6">All Guides</h2>
          <div className="space-y-3">
            {guides.map((guide) => (
              <Card key={guide.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {guide.description}
                      </p>
                    </div>
                    <Badge variant="outline">→</Badge>
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
