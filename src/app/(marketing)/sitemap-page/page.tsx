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
import Link from "next/link";
import { tools, categories } from "@/lib/tools";

export default function SitemapPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">Sitemap</Badge>
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Main Pages</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/blog", label: "Blog" },
                  { href: "/docs", label: "Docs" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                  { href: "/changelog", label: "Changelog" },
                  { href: "/features", label: "Features" },
                  { href: "/tech-stack", label: "Tech Stack" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/privacy", label: "Privacy" },
                  { href: "/terms", label: "Terms" },
                ].map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="text-sm text-primary hover:underline"
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { href: "/docs/getting-started", label: "Getting Started" },
                  { href: "/docs/authentication", label: "Authentication" },
                  { href: "/docs/billing", label: "Billing" },
                  { href: "/docs/teams", label: "Teams" },
                  { href: "/docs/deployment", label: "Deployment" },
                  { href: "/docs/api-keys", label: "API Keys" },
                  { href: "/docs/env-vars", label: "Env Variables" },
                  { href: "/docs/schema", label: "Database Schema" },
                ].map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="text-sm text-primary hover:underline"
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">API</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { href: "/api-docs", label: "API Documentation" },
                  { href: "/api-playground", label: "API Playground" },
                ].map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="text-sm text-primary hover:underline"
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { href: "/login", label: "Login" },
                  { href: "/register", label: "Register" },
                  { href: "/forgot-password", label: "Forgot Password" },
                ].map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="text-sm text-primary hover:underline"
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
