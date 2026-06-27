import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const changelog = [
  {
    version: "1.0.0",
    date: "June 15, 2025",
    tag: "Major Release",
    changes: [
      { type: "feature", text: "Authentication with email/password, OAuth, magic links, and 2FA" },
      { type: "feature", text: "Stripe billing with subscriptions, checkout, and webhooks" },
      { type: "feature", text: "Team management with RBAC (Owner, Admin, Member)" },
      { type: "feature", text: "RESTful API with API key authentication" },
      { type: "feature", text: "Dashboard with analytics, stats, and data tables" },
      { type: "feature", text: "Internationalization (English + Chinese)" },
      { type: "feature", text: "In-app and email notifications" },
      { type: "feature", text: "Docker and GitHub Actions CI/CD" },
    ],
  },
  {
    version: "0.2.0",
    date: "June 1, 2025",
    tag: "Beta",
    changes: [
      { type: "feature", text: "Added webhook delivery system" },
      { type: "feature", text: "Added audit logging" },
      { type: "improvement", text: "Improved error handling across all API routes" },
      { type: "fix", text: "Fixed session token refresh logic" },
    ],
  },
  {
    version: "0.1.0",
    date: "May 15, 2025",
    tag: "Alpha",
    changes: [
      { type: "feature", text: "Initial project scaffold" },
      { type: "feature", text: "Basic authentication flow" },
      { type: "feature", text: "Database schema with Drizzle ORM" },
    ],
  },
];

const typeColors: Record<string, string> = {
  feature: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  improvement: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  fix: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Changelog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Changelog</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Track what&apos;s new in SaaS Kit.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          {changelog.map((release) => (
            <Card key={release.version}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold">v{release.version}</h2>
                  <Badge>{release.tag}</Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                    <Calendar className="h-3 w-3" />
                    {release.date}
                  </span>
                </div>
                <ul className="space-y-2">
                  {release.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${typeColors[change.type]}`}
                      >
                        {change.type}
                      </span>
                      <span className="text-sm">{change.text}</span>
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
