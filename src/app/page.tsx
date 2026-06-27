import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import {
  Zap,
  Shield,
  Users,
  CreditCard,
  Globe,
  Code,
  BarChart3,
  Bell,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Authentication",
    description:
      "Email/password, OAuth (Google, GitHub), magic links, 2FA, and session management.",
  },
  {
    icon: CreditCard,
    title: "Billing & Subscriptions",
    description:
      "Stripe integration with plans, checkout, webhooks, and customer portal.",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Create teams, invite members, manage roles (Owner, Admin, Member) with RBAC.",
  },
  {
    icon: Code,
    title: "Developer API",
    description:
      "RESTful API with key authentication, rate limiting, and auto-generated docs.",
  },
  {
    icon: Globe,
    title: "Internationalization",
    description:
      "Built-in i18n with English and Chinese. Easy to add more languages.",
  },
  {
    icon: BarChart3,
    title: "Dashboard & Analytics",
    description:
      "Beautiful dashboard with charts, stats, data tables, and activity feeds.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "In-app and email notifications with configurable preferences.",
  },
  {
    icon: Zap,
    title: "Production Ready",
    description:
      "Docker, CI/CD, testing, SEO, rate limiting, error handling, and more.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Indie Hacker",
    content:
      "Saved me weeks of setup time. I went from idea to launched MVP in 3 days.",
  },
  {
    name: "Alex Rivera",
    role: "CTO, Startup",
    content:
      "The team management and RBAC system alone is worth it. Extremely well built.",
  },
  {
    name: "Marcus Johnson",
    role: "Full-stack Developer",
    content:
      "Best SaaS template I've used. Clean code, great DX, and everything just works.",
  },
];

const faqs = [
  {
    question: "What tech stack does this use?",
    answer:
      "Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Better Auth, Drizzle ORM, PostgreSQL, Stripe, and Resend.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes! SaaS Kit is open-source under the MIT license. Use it for personal or commercial projects.",
  },
  {
    question: "Can I use a different database?",
    answer:
      "The template uses PostgreSQL with Drizzle ORM. You can swap to MySQL or SQLite by changing the Drizzle adapter.",
  },
  {
    question: "How do I deploy it?",
    answer:
      "One-click deploy to Vercel, or use the included Docker setup for any cloud provider. GitHub Actions CI/CD is included.",
  },
  {
    question: "Can I use a different payment provider?",
    answer:
      "Stripe is the default, but the billing system is abstracted enough to swap to LemonSqueezy or Paddle.",
  },
  {
    question: "Does it support dark mode?",
    answer:
      "Yes! Full dark mode support using Tailwind CSS and next-themes.",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SaaS Kit",
    description: "Production-ready full-stack SaaS template built with Next.js 15, Better Auth, Drizzle ORM, Stripe, and shadcn/ui.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="container flex flex-col items-center justify-center gap-4 py-20 md:py-32 text-center px-4">
        <Badge variant="secondary" className="px-4 py-1">
          🚀 Open Source & Free
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
          Build Your SaaS{" "}
          <span className="text-primary">in Days, Not Months</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Production-ready full-stack template with auth, billing, teams, API,
          dashboard, and more. Ship faster with everything pre-built.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button size="lg" render={<Link href="/register" />}>
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          <Button size="lg" variant="outline" render={<Link href="/docs" />}>
            View Documentation
          </Button>
        </div>
        <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-500" />
            MIT License
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-500" />
            TypeScript
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20 px-4" id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            All the features you&apos;d spend months building, ready to go.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20 px-4 bg-muted/50" id="testimonials">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Loved by Developers
          </h2>
          <p className="text-muted-foreground mt-2">
            See what people are saying about SaaS Kit.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-20 px-4" id="faq">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-2">
            Got questions? We&apos;ve got answers.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Ship Faster?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Start building your SaaS today. No credit card required.
        </p>
        <Button size="lg" render={<Link href="/register" />}>
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </section>

      <Footer />
    </div>
  );
}
