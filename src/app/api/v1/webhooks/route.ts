import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { webhookEndpoints } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { randomBytes } from "crypto";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const endpoints = await db
    .select()
    .from(webhookEndpoints)
    .where(eq(webhookEndpoints.userId, session.user.id));

  return NextResponse.json(endpoints);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { url, events } = body;

  if (!url || !events?.length) {
    return NextResponse.json(
      { error: "URL and events are required" },
      { status: 400 }
    );
  }

  const secret = `whsec_${randomBytes(32).toString("hex")}`;

  const [endpoint] = await db
    .insert(webhookEndpoints)
    .values({
      userId: session.user.id,
      url,
      events,
      secret,
    })
    .returning();

  return NextResponse.json(endpoint, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await db
    .delete(webhookEndpoints)
    .where(eq(webhookEndpoints.id, id));

  return NextResponse.json({ success: true });
}
