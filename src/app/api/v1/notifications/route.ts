import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifications } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const unreadOnly = url.searchParams.get("unread") === "true";
  const limit = parseInt(url.searchParams.get("limit") || "20");

  const conditions = [eq(notifications.userId, session.user.id)];
  if (unreadOnly) {
    conditions.push(eq(notifications.read, false));
  }

  const results = await db
    .select()
    .from(notifications)
    .where(and(...conditions))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);

  const unreadCount = await db
    .select()
    .from(notifications)
    .where(and(eq(notifications.userId, session.user.id), eq(notifications.read, false)));

  return NextResponse.json({
    notifications: results,
    unreadCount: unreadCount.length,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, readAll } = body;

  if (readAll) {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, session.user.id));
    return NextResponse.json({ success: true });
  }

  if (id) {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, id));
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Missing id or readAll" }, { status: 400 });
}
