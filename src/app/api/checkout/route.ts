import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { teams, teamMembers, subscriptions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { priceId, teamId } = body;

  if (!priceId || !teamId) {
    return NextResponse.json(
      { error: "Missing priceId or teamId" },
      { status: 400 }
    );
  }

  // Verify user is team owner
  const [membership] = await db
    .select()
    .from(teamMembers)
    .where(
      and(
        eq(teamMembers.teamId, teamId),
        eq(teamMembers.userId, session.user.id)
      )
    )
    .limit(1);

  if (!membership || membership.role !== "owner") {
    return NextResponse.json(
      { error: "Only team owners can manage billing" },
      { status: 403 }
    );
  }

  // Get or create Stripe customer
  const [existingSub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.teamId, teamId))
    .limit(1);

  let customerId = existingSub?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      metadata: { teamId, userId: session.user.id },
    });
    customerId = customer.id;
  }

  // Create checkout session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: { teamId },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
