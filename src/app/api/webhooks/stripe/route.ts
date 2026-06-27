import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { subscriptions, teams, invoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

function getStripeInstance() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_placeholder");
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripeInstance().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoiceFailed(invoice);
        break;
      }
    }
  } catch (err) {
    console.error(`Error handling event ${event.type}:`, err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const teamId = session.metadata?.teamId;
  if (!teamId) return;

  const subscription = await getStripeInstance().subscriptions.retrieve(
    session.subscription as string
  );

  const sub = subscription as unknown as Record<string, unknown>;
  const currentPeriodStart = (sub.current_period_start as number) ?? Math.floor(Date.now() / 1000);
  const currentPeriodEnd = (sub.current_period_end as number) ?? Math.floor(Date.now() / 1000);

  await db.insert(subscriptions).values({
    teamId,
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: subscription.customer as string,
    stripePriceId: subscription.items.data[0].price.id,
    status: subscription.status as typeof subscriptions.$inferInsert.status,
    currentPeriodStart: new Date(currentPeriodStart * 1000),
    currentPeriodEnd: new Date(currentPeriodEnd * 1000),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const sub = subscription as unknown as Record<string, unknown>;
  const currentPeriodStart = (sub.current_period_start as number) ?? Math.floor(Date.now() / 1000);
  const currentPeriodEnd = (sub.current_period_end as number) ?? Math.floor(Date.now() / 1000);

  await db
    .update(subscriptions)
    .set({
      status: subscription.status as typeof subscriptions.$inferInsert.status,
      stripePriceId: subscription.items.data[0].price.id,
      currentPeriodStart: new Date(currentPeriodStart * 1000),
      currentPeriodEnd: new Date(currentPeriodEnd * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await db
    .update(subscriptions)
    .set({
      status: "canceled",
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const inv = invoice as unknown as Record<string, unknown>;
  const subscriptionId = inv.subscription as string;

  const sub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (sub[0]) {
    await db.insert(invoices).values({
      teamId: sub[0].teamId,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_paid,
      status: "paid",
      paidAt: new Date(),
    });
  }
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const inv = invoice as unknown as Record<string, unknown>;
  const subscriptionId = inv.subscription as string;

  const sub = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (sub[0]) {
    await db.insert(invoices).values({
      teamId: sub[0].teamId,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_due,
      status: "failed",
    });
  }
}
