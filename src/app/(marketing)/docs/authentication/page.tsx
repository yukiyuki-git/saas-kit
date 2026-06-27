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
import { Shield, Key, Mail, Smartphone } from "lucide-react";

const features = [
  {
    icon: Mail,
    title: "Email/Password",
    description: "Traditional email and password authentication with secure hashing.",
    details: [
      "Passwords hashed with bcrypt",
      "Email verification support",
      "Password reset via email",
      "Rate limiting on login attempts",
    ],
  },
  {
    icon: Key,
    title: "OAuth Providers",
    description: "Sign in with GitHub, Google, or add your own providers.",
    details: [
      "GitHub OAuth integration",
      "Google OAuth integration",
      "Easy to add more providers",
      "Automatic account linking",
    ],
  },
  {
    icon: Mail,
    title: "Magic Links",
    description: "Passwordless authentication via email magic links.",
    details: [
      "One-click sign in via email",
      "Time-limited tokens",
      "No password required",
      "Great for user onboarding",
    ],
  },
  {
    icon: Smartphone,
    title: "Two-Factor Auth",
    description: "Add an extra layer of security with TOTP-based 2FA.",
    details: [
      "TOTP-based (Google Authenticator)",
      "QR code setup",
      "Backup codes",
      "Optional per-user enforcement",
    ],
  },
];

export default function AuthGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Authentication Guide</h1>
          <p className="text-muted-foreground text-lg mb-8">
            SaaS Kit uses Better Auth for authentication. Learn how to configure
            and customize the auth system.
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Overview</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Better Auth handles all authentication flows including
                  registration, login, password reset, OAuth, and session
                  management. It&apos;s configured in{" "}
                  <code className="bg-muted px-1 rounded">src/lib/auth.ts</code>.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`// src/lib/auth.ts
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: { clientId: "...", clientSecret: "..." },
    google: { clientId: "...", clientSecret: "..." },
  },
  session: { expiresIn: 60 * 60 * 24 * 7 },
});`}</pre>
                </div>
              </CardContent>
            </Card>

            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>API Routes</CardTitle>
                <CardDescription>
                  All auth endpoints are available under /api/auth/
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-16 justify-center">POST</Badge>
                    <code>/api/auth/sign-up/email</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-16 justify-center">POST</Badge>
                    <code>/api/auth/sign-in/email</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-16 justify-center">POST</Badge>
                    <code>/api/auth/sign-in/github</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-16 justify-center">POST</Badge>
                    <code>/api/auth/sign-in/google</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-16 justify-center">POST</Badge>
                    <code>/api/auth/forget-password</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-16 justify-center">POST</Badge>
                    <code>/api/auth/reset-password</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-16 justify-center">GET</Badge>
                    <code>/api/auth/get-session</code>
                  </div>
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
