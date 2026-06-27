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
import { Separator } from "@/components/ui/separator";
import { Terminal, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "1. Clone the Repository",
    description: "Get the code on your local machine",
    code: `git clone https://github.com/your-username/saas-kit.git
cd saas-kit`,
  },
  {
    title: "2. Install Dependencies",
    description: "Install all required packages",
    code: `pnpm install`,
  },
  {
    title: "3. Set Up Environment",
    description: "Copy and configure your environment variables",
    code: `cp .env.example .env
# Edit .env with your database URL, auth secret, Stripe keys, etc.`,
  },
  {
    title: "4. Set Up Database",
    description: "Push the schema to your PostgreSQL database",
    code: `pnpm db:push`,
  },
  {
    title: "5. Start Development Server",
    description: "Run the development server",
    code: `pnpm dev`,
  },
  {
    title: "6. Open in Browser",
    description: "Visit your local development server",
    code: `# Open http://localhost:3000 in your browser
# You should see the landing page!`,
  },
];

const envVars = [
  { name: "DATABASE_URL", description: "PostgreSQL connection string", example: "postgresql://user:pass@localhost:5432/saas_kit" },
  { name: "BETTER_AUTH_SECRET", description: "Secret for auth (min 32 chars)", example: "your-super-secret-key-here-at-least-32-chars" },
  { name: "STRIPE_SECRET_KEY", description: "Stripe secret API key", example: "sk_test_..." },
  { name: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", description: "Stripe publishable key", example: "pk_test_..." },
  { name: "STRIPE_WEBHOOK_SECRET", description: "Stripe webhook endpoint secret", example: "whsec_..." },
  { name: "RESEND_API_KEY", description: "Resend email API key", example: "re_..." },
  { name: "NEXT_PUBLIC_APP_URL", description: "Your application URL", example: "http://localhost:3000" },
];

export default function GettingStartedPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Get your SaaS Kit project up and running in under 5 minutes.
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Node.js 18+ (recommended: 20+)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>pnpm (recommended) or npm</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>PostgreSQL database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Stripe account (for billing)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Resend account (for emails)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {steps.map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <Terminal className="inline h-4 w-4 mr-2 text-muted-foreground" />
                    <pre className="inline whitespace-pre-wrap">{step.code}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>
                  Required environment variables for your .env file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {envVars.map((envVar) => (
                    <div key={envVar.name}>
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-sm font-semibold bg-muted px-2 py-0.5 rounded">
                          {envVar.name}
                        </code>
                        <span className="text-xs text-muted-foreground">
                          {envVar.description}
                        </span>
                      </div>
                      <code className="text-xs text-muted-foreground pl-2">
                        {envVar.example}
                      </code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
