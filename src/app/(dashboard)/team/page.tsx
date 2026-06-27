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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserPlus,
  MoreVertical,
  Shield,
  Crown,
  User,
  Trash2,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

const members = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    joinedAt: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "admin",
    joinedAt: "Feb 20, 2024",
  },
  {
    id: "3",
    name: "Alex Rivera",
    email: "alex@example.com",
    role: "member",
    joinedAt: "Mar 10, 2024",
  },
];

const invitations = [
  {
    id: "1",
    email: "new@example.com",
    role: "member",
    sentAt: "2 hours ago",
  },
];

const roleIcons: Record<string, typeof Crown> = {
  owner: Crown,
  admin: Shield,
  member: User,
};

const roleColors: Record<string, string> = {
  owner: "default",
  admin: "secondary",
  member: "outline",
};

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleInvite() {
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members and invitations
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button />}>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={inviteRole} onValueChange={(v) => setInviteRole(v ?? "member")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInvite} disabled={!inviteEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle>Members ({members.length})</CardTitle>
          <CardDescription>People with access to this workspace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {members.map((member) => {
            const RoleIcon = roleIcons[member.role];
            return (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={roleColors[member.role] as "default" | "secondary" | "outline"}>
                    <RoleIcon className="mr-1 h-3 w-3" />
                    {member.role}
                  </Badge>
                  {member.role !== "owner" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
                          <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations ({invitations.length})</CardTitle>
            <CardDescription>Invitations that haven&apos;t been accepted yet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      <Mail className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{invitation.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Sent {invitation.sentAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Pending</Badge>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
