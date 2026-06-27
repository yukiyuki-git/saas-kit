import { db } from "./index";
import {
  users,
  teams,
  teamMembers,
  subscriptions,
  notifications,
  auditLogs,
} from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create demo users
  const [user1] = await db
    .insert(users)
    .values({
      name: "John Doe",
      email: "john@example.com",
      emailVerified: true,
    })
    .returning();

  const [user2] = await db
    .insert(users)
    .values({
      name: "Sarah Chen",
      email: "sarah@example.com",
      emailVerified: true,
    })
    .returning();

  const [user3] = await db
    .insert(users)
    .values({
      name: "Alex Rivera",
      email: "alex@example.com",
      emailVerified: true,
    })
    .returning();

  console.log("✅ Created users");

  // Create demo team
  const [team] = await db
    .insert(teams)
    .values({
      name: "Acme Corp",
      slug: "acme-corp",
    })
    .returning();

  // Add team members
  await db.insert(teamMembers).values([
    { teamId: team.id, userId: user1.id, role: "owner" },
    { teamId: team.id, userId: user2.id, role: "admin" },
    { teamId: team.id, userId: user3.id, role: "member" },
  ]);

  console.log("✅ Created team with members");

  // Create demo notifications
  await db.insert(notifications).values([
    {
      userId: user1.id,
      type: "team_invite",
      title: "Team Created",
      message: "Your team Acme Corp has been created successfully.",
      read: false,
    },
    {
      userId: user1.id,
      type: "system",
      title: "Welcome!",
      message: "Welcome to SaaS Kit. Get started by exploring the dashboard.",
      read: true,
    },
    {
      userId: user2.id,
      type: "team_invite",
      title: "Team Invitation",
      message: "You've been added to Acme Corp as an admin.",
      read: false,
    },
  ]);

  console.log("✅ Created notifications");

  // Create audit log
  await db.insert(auditLogs).values([
    {
      userId: user1.id,
      teamId: team.id,
      action: "team.created",
      resource: "team",
      resourceId: team.id,
      metadata: { teamName: "Acme Corp" },
    },
    {
      userId: user1.id,
      teamId: team.id,
      action: "member.invited",
      resource: "team_member",
      resourceId: user2.id,
      metadata: { email: "sarah@example.com", role: "admin" },
    },
  ]);

  console.log("✅ Created audit logs");

  console.log("🎉 Seed completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
