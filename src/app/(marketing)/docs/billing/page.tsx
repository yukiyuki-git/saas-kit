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
import { CreditCard, Webhook, Settings, BarChart3 } from "lucide-react";

export default function BillingGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Billing Guide</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Learn how to set up and manage Stripe billing in your SaaS Kit
            application.
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle>Stripe Setup</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Configure your Stripe account and environment variables.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`# .env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional: Custom price IDs
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...`}</pre>
                </div>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                    Create a Stripe account at stripe.com
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</span>
                    Get your API keys from the Stripe Dashboard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</span>
                    Create products and prices in Stripe
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">4</span>
                    Set up webhook endpoint pointing to your domain
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Plans Configuration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Plans are defined in{" "}
                  <code className="bg-muted px-1 rounded">src/lib/stripe.ts</code>.
                  Each plan includes pricing, features, and limits.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    limits: { teamMembers: 1, apiCalls: 1000 },
  },
  pro: {
    name: "Pro",
    price: 29,
    priceId: "price_...",
    limits: { teamMembers: 5, apiCalls: 50000 },
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    priceId: "price_...",
    limits: { teamMembers: Infinity, apiCalls: Infinity },
  },
};`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-primary" />
                  <CardTitle>Webhook Events</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  The webhook handler processes these Stripe events automatically:
                </p>
                <div className="space-y-2">
                  {[
                    { event: "checkout.session.completed", description: "User completed checkout" },
                    { event: "customer.subscription.created", description: "New subscription created" },
                    { event: "customer.subscription.updated", description: "Subscription plan changed" },
                    { event: "customer.subscription.deleted", description: "Subscription canceled" },
                    { event: "invoice.payment_succeeded", description: "Payment successful" },
                    { event: "invoice.payment_failed", description: "Payment failed" },
                  ].map((item) => (
                    <div key={item.event} className="flex items-center justify-between p-2 border rounded">
                      <code className="text-xs">{item.event}</code>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Usage Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Track API usage and enforce limits based on subscription plan.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`// Check API call limit
const plan = PLANS[userPlan];
if (apiCalls >= plan.limits.apiCalls) {
  return NextResponse.json(
    { error: "API limit exceeded" },
    { status: 429 }
  );
}`}</pre>
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
