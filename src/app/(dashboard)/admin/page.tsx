"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Activity,
  Shield,
  Settings,
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "active", plan: "Pro", joinedAt: "2024-01-15", lastActive: "2 hours ago" },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", status: "active", plan: "Enterprise", joinedAt: "2024-02-20", lastActive: "1 hour ago" },
  { id: "3", name: "Alex Rivera", email: "alex@example.com", status: "active", plan: "Free", joinedAt: "2024-03-10", lastActive: "3 hours ago" },
  { id: "4", name: "Marcus Lee", email: "marcus@example.com", status: "suspended", plan: "Pro", joinedAt: "2024-04-05", lastActive: "3 days ago" },
  { id: "5", name: "Emily Wang", email: "emily@example.com", status: "active", plan: "Free", joinedAt: "2024-05-12", lastActive: "30 minutes ago" },
];

const mockAuditLogs = [
  { id: "1", action: "user.login", user: "john@example.com", ip: "192.168.1.1", time: "2 minutes ago" },
  { id: "2", action: "team.created", user: "sarah@example.com", ip: "10.0.0.1", time: "15 minutes ago" },
  { id: "3", action: "subscription.upgraded", user: "alex@example.com", ip: "172.16.0.1", time: "1 hour ago" },
  { id: "4", action: "api_key.created", user: "emily@example.com", ip: "192.168.2.5", time: "2 hours ago" },
  { id: "5", action: "user.suspended", user: "admin@saas-kit.dev", ip: "10.0.0.1", time: "3 hours ago" },
  { id: "6", action: "password.changed", user: "marcus@example.com", ip: "172.16.0.5", time: "5 hours ago" },
];

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

export default function AdminPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage users, monitor activity, and configure system settings.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-500">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Teams</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-green-500">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">MRR</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-green-500">+23.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Uptime</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="features">Feature Flags</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[user.status]}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.plan}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.joinedAt}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                            <MoreVertical className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>System-wide activity log</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.user}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-1 rounded">{log.ip}</code>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>Toggle features on/off for your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Dark Mode", flag: "dark_mode", enabled: true },
                  { name: "Two-Factor Auth", flag: "two_factor_auth", enabled: true },
                  { name: "Team Invitations", flag: "team_invitations", enabled: true },
                  { name: "API Keys", flag: "api_keys", enabled: true },
                  { name: "Webhooks", flag: "webhooks", enabled: true },
                  { name: "Advanced Analytics", flag: "advanced_analytics", enabled: true },
                  { name: "File Uploads", flag: "file_uploads", enabled: false },
                  { name: "Blog", flag: "blog", enabled: true },
                  { name: "i18n", flag: "i18n", enabled: true },
                  { name: "Command Palette", flag: "command_palette", enabled: true },
                  { name: "Beta Features", flag: "beta_features", enabled: false },
                ].map((feature) => (
                  <div key={feature.flag} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{feature.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{feature.flag}</p>
                    </div>
                    <Badge variant={feature.enabled ? "default" : "secondary"}>
                      {feature.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
