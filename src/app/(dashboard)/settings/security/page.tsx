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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, Smartphone, Monitor, Trash2 } from "lucide-react";
import { toast } from "sonner";

const activeSessions = [
  {
    device: "Chrome on Windows",
    ip: "192.168.1.1",
    lastActive: "Now",
    current: true,
  },
  {
    device: "Safari on macOS",
    ip: "10.0.0.1",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    device: "Firefox on Linux",
    ip: "172.16.0.1",
    lastActive: "1 day ago",
    current: false,
  },
];

export default function SecuritySettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Password changed successfully");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security</h1>
        <p className="text-muted-foreground">
          Manage your password and security settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New Password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input id="confirm" type="password" />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>
        </CardHeader>
        {twoFactorEnabled && (
          <CardContent>
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">2FA is enabled</p>
                <p className="text-sm text-muted-foreground">
                  Your account is protected with TOTP authentication
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeSessions.map((session, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {session.device.includes("Windows") ||
                session.device.includes("macOS") ? (
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{session.device}</p>
                    {session.current && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {session.ip} · {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Separator />
          <Button variant="outline" className="w-full">
            Sign Out All Other Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
