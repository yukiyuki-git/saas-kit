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
import { Book, Code, Rocket, Settings, Users, CreditCard } from "lucide-react";

const sections = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Quick setup guide to get your project running in minutes.",
    items: ["Installation", "Environment Setup", "Database Migration", "First Run"],
  },
  {
    icon: Settings,
    title: "Authentication",
    description: "Configure email/password, OAuth, magic links, and 2FA.",
    items: ["Email/Password", "OAuth Providers", "Magic Links", "Two-Factor Auth"],
  },
  {
    icon: CreditCard,
    title: "Billing",
    description: "Set up Stripe for subscriptions and payments.",
    items: ["Stripe Setup", "Plans Configuration", "Webhooks", "Customer Portal"],
  },
  {
    icon: Users,
    title: "Teams",
    description: "Team management with roles and invitations.",
    items: ["Team Creation", "Invitations", "Role-Based Access", "Activity Logs"],
  },
  {
    icon: Code,
    title: "API Reference",
    description: "RESTful API documentation with examples.",
    items: ["Authentication", "Users", "Teams", "Subscriptions"],
  },
  {
    icon: Book,
    title: "Deployment",
    description: "Deploy to Vercel, Docker, or any cloud provider.",
    items: ["Vercel", "Docker", "GitHub Actions", "Environment Variables"],
  },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Documentation
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to build and deploy your SaaS.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sections.map((section) => (
            <Card key={section.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-2">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      → {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
