import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teams, teamMembers, subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userTeams = await db
    .select({
      team: teams,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, session.user.id));

  return NextResponse.json(userTeams);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name } = body;

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Team name must be at least 2 characters" },
      { status: 400 }
    );
  }

  const slug = slugify(name);

  // Check if slug is taken
  const existing = await db
    .select()
    .from(teams)
    .where(eq(teams.slug, slug))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json(
      { error: "A team with this name already exists" },
      { status: 409 }
    );
  }

  const [team] = await db
    .insert(teams)
    .values({ name, slug })
    .returning();

  // Add creator as owner
  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: session.user.id,
    role: "owner",
  });

  return NextResponse.json(team, { status: 201 });
}
