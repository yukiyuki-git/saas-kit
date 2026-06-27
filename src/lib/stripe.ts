import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const PLANS = {
  free: {
    name: "Free",
    description: "For individuals getting started",
    price: 0,
    priceId: "",
    features: [
      "1 team member",
      "1,000 API calls/month",
      "Basic analytics",
      "Community support",
    ],
    limits: {
      teamMembers: 1,
      apiCalls: 1000,
    },
  },
  pro: {
    name: "Pro",
    description: "For growing teams",
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro_monthly",
    features: [
      "Up to 5 team members",
      "50,000 API calls/month",
      "Advanced analytics",
      "Priority email support",
      "Custom webhooks",
      "API access",
    ],
    limits: {
      teamMembers: 5,
      apiCalls: 50000,
    },
  },
  enterprise: {
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise_monthly",
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
    limits: {
      teamMembers: Infinity,
      apiCalls: Infinity,
    },
  },
} as const;

export type PlanId = keyof typeof PLANS;
