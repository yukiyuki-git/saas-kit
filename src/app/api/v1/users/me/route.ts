import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, teamMembers, teams, subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // Try API key auth first, then session auth
  const apiKey = req.headers.get("x-api-key");
  let userId: string;

  if (apiKey) {
    const { validateApiKey } = await import("@/lib/api-key");
    const result = await validateApiKey(apiKey);
    if (!result?.user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }
    userId = result.user.id;
  } else {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    userId = session.user.id;
  }

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      emailVerified: users.emailVerified,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Get user's teams
  const userTeams = await db
    .select({
      team: teams,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, userId));

  return NextResponse.json({
    ...user,
    teams: userTeams.map((t) => ({
      ...t.team,
      role: t.role,
    })),
  });
}

export async function PATCH(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, image } = body;

  await db
    .update(users)
    .set({
      ...(name && { name }),
      ...(image && { image }),
      updatedAt: new Date(),
    })
    .where(eq(users.id, session.user.id));

  return NextResponse.json({ success: true });
}
