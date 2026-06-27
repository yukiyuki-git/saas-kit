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
import { Key, Shield, Clock, Code } from "lucide-react";

export default function ApiKeysGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl font-bold mb-4">API Keys Guide</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Learn how to create, manage, and use API keys for programmatic
            access to your SaaS Kit application.
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  <CardTitle>Creating API Keys</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  API keys can be created from the Settings → API Keys page in
                  the dashboard, or via the API.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`// Create via dashboard
// Settings → API Keys → Create API Key

// Key format: sk_<64 hex characters>
// Example: sk_a1b2c3d4e5f6...

// IMPORTANT: Copy the key immediately!
// It won't be shown again after creation.`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Using API Keys</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Include your API key in the{" "}
                  <code className="bg-muted px-1 rounded">x-api-key</code>{" "}
                  header with every request.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`curl -H "x-api-key: sk_your_api_key" \\
  http://localhost:3000/api/v1/users/me

// Or in JavaScript
const response = await fetch("/api/v1/users/me", {
  headers: {
    "x-api-key": "sk_your_api_key",
  },
});`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle>Key Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    API keys are hashed with SHA-256 before storage
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    Only a preview (sk_xxx...xxx) is stored in plain text
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    Keys can have optional expiration dates
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    Last used timestamp is tracked for monitoring
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                    Revoke keys immediately if compromised
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <CardTitle>Rate Limits by Plan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { plan: "Free", limit: "100 requests/minute", color: "secondary" },
                    { plan: "Pro", limit: "1,000 requests/minute", color: "default" },
                    { plan: "Enterprise", limit: "10,000 requests/minute", color: "default" },
                  ].map((item) => (
                    <div key={item.plan} className="flex items-center justify-between p-3 border rounded">
                      <Badge variant={item.color as "default" | "secondary"}>{item.plan}</Badge>
                      <span className="text-sm">{item.limit}</span>
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
