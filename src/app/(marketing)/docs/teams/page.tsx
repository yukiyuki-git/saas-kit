import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Shield, Mail, Settings } from "lucide-react";

const roles = [
  {
    name: "Owner",
    permissions: [
      "All admin permissions",
      "Manage billing and subscriptions",
      "Delete team",
      "Transfer ownership",
    ],
  },
  {
    name: "Admin",
    permissions: [
      "Invite and remove members",
      "Manage team settings",
      "View all dashboards",
      "Use all features",
    ],
  },
  {
    name: "Member",
    permissions: [
      "View dashboard",
      "Use team features",
      "View team members",
      "Manage own profile",
    ],
  },
];

export default function TeamGuidePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="container py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Team Management Guide</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Learn how to manage teams, invite members, and configure role-based
            access control.
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Creating a Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Teams are the organizational unit in SaaS Kit. Each team has
                  its own members, subscription, and settings.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`// Create a team via API
const response = await fetch("/api/v1/teams", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "My Team" }),
});

// Response: { id: "...", name: "My Team", slug: "my-team" }`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Roles & Permissions</CardTitle>
                </div>
                <CardDescription>
                  SaaS Kit uses a hierarchical role system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.name} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={role.name === "Owner" ? "default" : role.name === "Admin" ? "secondary" : "outline"}>
                          {role.name}
                        </Badge>
                      </div>
                      <ul className="space-y-1">
                        {role.permissions.map((permission) => (
                          <li
                            key={permission}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {permission}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <CardTitle>Inviting Members</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Invite members via email. They&apos;ll receive an invitation
                  link that expires in 7 days.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`// Invite a member
const response = await fetch("/api/v1/teams/:id/members", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    role: "member",  // or "admin"
  }),
});`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <CardTitle>Team Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Configure team name, logo, and other settings.
                </p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <pre>{`// Update team settings
const response = await fetch("/api/v1/teams/:id", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Updated Team Name",
    logo: "https://...",
  }),
});`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
