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
import { Zap, Code, Shield, Users, CreditCard, Globe, Database, TestTube, Server } from "lucide-react";

const techStack = [
  { name: "Next.js 15", description: "React framework with App Router", category: "Framework" },
  { name: "TypeScript", description: "Type-safe JavaScript", category: "Language" },
  { name: "Tailwind CSS v4", description: "Utility-first CSS framework", category: "Styling" },
  { name: "shadcn/ui", description: "Re-usable component library", category: "Components" },
  { name: "Better Auth", description: "Authentication library", category: "Auth" },
  { name: "Drizzle ORM", description: "TypeScript ORM for SQL", category: "Database" },
  { name: "PostgreSQL", description: "Relational database", category: "Database" },
  { name: "Stripe", description: "Payment processing", category: "Payments" },
  { name: "Resend", description: "Email delivery", category: "Email" },
  { name: "Recharts", description: "Chart library for React", category: "Charts" },
  { name: "next-intl", description: "Internationalization", category: "i18n" },
  { name: "next-themes", description: "Theme management", category: "Theming" },
  { name: "Zod", description: "Schema validation", category: "Validation" },
  { name: "Vitest", description: "Unit testing framework", category: "Testing" },
  { name: "Playwright", description: "E2E testing framework", category: "Testing" },
  { name: "Storybook", description: "Component documentation", category: "Docs" },
  { name: "Docker", description: "Containerization", category: "DevOps" },
  { name: "GitHub Actions", description: "CI/CD", category: "DevOps" },
];

export default function TechStackPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Tech Stack
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tech Stack</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Built with modern, production-ready technologies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {techStack.map((tech) => (
            <Card key={tech.name}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{tech.name}</h3>
                  <Badge variant="outline" className="text-xs">{tech.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
