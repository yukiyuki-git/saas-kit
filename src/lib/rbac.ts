import { db } from "@/lib/db";
import { teamMembers, teams } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export type TeamRole = "owner" | "admin" | "member";

const ROLE_HIERARCHY: Record<TeamRole, number> = {
  owner: 3,
  admin: 2,
  member: 1,
};

export function hasPermission(
  userRole: TeamRole,
  requiredRole: TeamRole
): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export const PERMISSIONS = {
  MANAGE_BILLING: "owner" as TeamRole,
  DELETE_TEAM: "owner" as TeamRole,
  TRANSFER_OWNERSHIP: "owner" as TeamRole,
  INVITE_MEMBERS: "admin" as TeamRole,
  REMOVE_MEMBERS: "admin" as TeamRole,
  MANAGE_SETTINGS: "admin" as TeamRole,
  VIEW_DASHBOARD: "member" as TeamRole,
  USE_FEATURES: "member" as TeamRole,
} as const;

export async function getTeamMembership(userId: string, teamId: string) {
  const [membership] = await db
    .select()
    .from(teamMembers)
    .where(
      and(eq(teamMembers.userId, userId), eq(teamMembers.teamId, teamId))
    )
    .limit(1);

  return membership;
}

export async function requireTeamRole(
  userId: string,
  teamId: string,
  requiredRole: TeamRole
) {
  const membership = await getTeamMembership(userId, teamId);

  if (!membership) {
    throw new Error("Not a member of this team");
  }

  if (!hasPermission(membership.role as TeamRole, requiredRole)) {
    throw new Error(`Insufficient permissions. Required: ${requiredRole}`);
  }

  return membership;
}

export async function getUserTeams(userId: string) {
  const result = await db
    .select({
      team: teams,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, userId));

  return result;
}
