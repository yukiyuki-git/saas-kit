"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "For individuals getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1 team member",
      "1,000 API calls/month",
      "Basic analytics",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Up to 5 team members",
      "50,000 API calls/month",
      "Advanced analytics",
      "Priority email support",
      "Custom webhooks",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Unlimited team members",
      "Unlimited API calls",
      "Advanced analytics",
      "Dedicated support",
      "Custom webhooks",
      "API access",
      "SSO/SAML",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start for free, upgrade as you grow. No hidden fees.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={!isYearly ? "font-semibold" : "text-muted-foreground"}>
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={isYearly ? "font-semibold" : "text-muted-foreground"}>
              Yearly
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${price}</span>
                    {price > 0 && (
                      <span className="text-muted-foreground">
                        /{isYearly ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    render={<Link href="/register" />}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
