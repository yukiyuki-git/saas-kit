import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is SaaS Kit?",
    answer: "SaaS Kit is a production-ready full-stack SaaS template built with Next.js 15, TypeScript, Better Auth, Drizzle ORM, Stripe, and shadcn/ui. It includes authentication, billing, team management, API, dashboard, and more.",
  },
  {
    question: "Is it really free?",
    answer: "Yes! SaaS Kit is open-source under the MIT license. You can use it for personal or commercial projects without any cost.",
  },
  {
    question: "What tech stack does it use?",
    answer: "Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Better Auth, Drizzle ORM, PostgreSQL, Stripe, Resend, Recharts, next-intl, and more.",
  },
  {
    question: "Can I use a different database?",
    answer: "The template uses PostgreSQL with Drizzle ORM. You can swap to MySQL or SQLite by changing the Drizzle adapter configuration.",
  },
  {
    question: "Can I use a different payment provider?",
    answer: "Stripe is the default, but the billing system is abstracted enough to swap to LemonSqueezy or Paddle with minimal changes.",
  },
  {
    question: "How do I deploy it?",
    answer: "One-click deploy to Vercel, or use the included Docker setup for any cloud provider. GitHub Actions CI/CD is included for automated testing and deployment.",
  },
  {
    question: "Does it support dark mode?",
    answer: "Yes! Full dark mode support using Tailwind CSS and next-themes. Users can toggle between light, dark, and system themes.",
  },
  {
    question: "Is it production-ready?",
    answer: "Yes! SaaS Kit includes security headers, rate limiting, input validation, error handling, testing (unit + E2E), and Docker support for production deployment.",
  },
  {
    question: "How do I add more OAuth providers?",
    answer: "Better Auth supports many OAuth providers. Add the provider configuration in src/lib/auth.ts with the client ID and secret.",
  },
  {
    question: "Can I customize the pricing plans?",
    answer: "Yes! Plans are defined in src/lib/stripe.ts. You can add/remove plans, change prices, and update features easily.",
  },
  {
    question: "Does it include API documentation?",
    answer: "Yes! There's an interactive API docs page and an API playground where you can test endpoints directly in the browser.",
  },
  {
    question: "How do I add more languages?",
    answer: "Add a new translation file in the messages/ directory (e.g., messages/fr.json) and update the i18n routing configuration.",
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to know about SaaS Kit.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
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
      <Footer />
    </div>
  );
}
