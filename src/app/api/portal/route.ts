import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { teamMembers, subscriptions } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { teamId } = body;

  // Verify user is team member
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

  if (!membership) {
    return NextResponse.json(
      { error: "Not a member of this team" },
      { status: 403 }
    );
  }

  // Get Stripe customer
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.teamId, teamId))
    .limit(1);

  if (!sub?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No active subscription" },
      { status: 404 }
    );
  }

  // Create portal session
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  });

  return NextResponse.json({ url: portalSession.url });
}
