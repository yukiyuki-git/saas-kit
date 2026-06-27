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
import { Globe, Dock, Server } from "lucide-react";
import { GithubIcon } from "@/components/icons";

const platforms = [
  {
    icon: Globe,
    name: "Vercel",
    recommended: true,
    steps: [
      "Push your code to GitHub",
      "Go to vercel.com/new and import your repository",
      "Add environment variables in the Vercel dashboard",
      "Click Deploy",
      "Set up PostgreSQL (Vercel Postgres, Neon, or Supabase)",
    ],
    notes: [
      "Vercel automatically detects Next.js",
      "Edge middleware works out of the box",
      "Serverless functions for API routes",
    ],
  },
  {
    icon: Dock,
    name: "Docker",
    recommended: false,
    steps: [
      "Build the Docker image: docker build -t saas-kit .",
      "Run with docker-compose: docker-compose up -d",
      "Or run standalone: docker run -p 3000:3000 saas-kit",
      "Configure your reverse proxy (nginx, Caddy, etc.)",
    ],
    notes: [
      "Includes PostgreSQL and Redis in docker-compose",
      "Multi-stage build for smaller image size",
      "Standalone output mode for optimal performance",
    ],
  },
  {
    icon: Server,
    name: "Self-Hosted (VPS)",
    recommended: false,
    steps: [
      "SSH into your server",
      "Install Node.js 20+ and pnpm",
      "Clone the repository",
      "Install dependencies: pnpm install",
      "Build: pnpm build",
      "Start with PM2: pm2 start npm --name saas-kit -- start",
      "Configure nginx as reverse proxy",
      "Set up SSL with Certbot",
    ],
    notes: [
      "Use PM2 for process management",
      "Set up systemd service for auto-restart",
      "Configure log rotation",
    ],
  },
  {
    icon: GithubIcon,
    name: "GitHub Actions CI/CD",
    recommended: false,
    steps: [
      "Push code to GitHub",
      "GitHub Actions runs lint, type check, and tests on every PR",
      "Merge to main triggers deployment",
      "Configure deployment secrets in GitHub repository settings",
    ],
    notes: [
      "CI runs on every pull request",
      "Deploy on merge to main",
      "Supports Vercel, Docker, or custom deployments",
    ],
  },
];

export default function DeploymentGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Deployment Guide</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Learn how to deploy SaaS Kit to production. Choose the platform that
            works best for you.
          </p>

          <div className="space-y-6">
            {platforms.map((platform) => (
              <Card key={platform.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <platform.icon className="h-5 w-5 text-primary" />
                      <CardTitle>{platform.name}</CardTitle>
                    </div>
                    {platform.recommended && (
                      <Badge>Recommended</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Steps:</h4>
                    <ol className="space-y-2">
                      {platform.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Notes:</h4>
                    <ul className="space-y-1">
                      {platform.notes.map((note) => (
                        <li key={note} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {note}
                        </li>
                      ))}
                    </ul>
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
