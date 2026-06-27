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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const notificationSettings = [
  {
    category: "Team",
    items: [
      { id: "team_invite", label: "Team invitations", description: "When someone invites you to a team", inApp: true, email: true },
      { id: "team_join", label: "Member joined", description: "When a new member joins your team", inApp: true, email: false },
      { id: "team_leave", label: "Member left", description: "When a member leaves your team", inApp: true, email: false },
    ],
  },
  {
    category: "Billing",
    items: [
      { id: "payment_success", label: "Payment succeeded", description: "When a payment is successfully processed", inApp: true, email: true },
      { id: "payment_failed", label: "Payment failed", description: "When a payment fails", inApp: true, email: true },
      { id: "subscription_change", label: "Subscription changes", description: "When your subscription is updated", inApp: true, email: true },
    ],
  },
  {
    category: "Security",
    items: [
      { id: "new_login", label: "New login", description: "When a new device signs in to your account", inApp: true, email: true },
      { id: "password_change", label: "Password changed", description: "When your password is changed", inApp: true, email: true },
      { id: "api_key_created", label: "API key created", description: "When a new API key is generated", inApp: true, email: false },
    ],
  },
];

export default function NotificationsSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, { inApp: boolean; email: boolean }>>(
    Object.fromEntries(
      notificationSettings.flatMap((cat) =>
        cat.items.map((item) => [item.id, { inApp: item.inApp, email: item.email }])
      )
    )
  );

  function togglePref(id: string, type: "inApp" | "email") {
    setPrefs((prev) => ({
      ...prev,
      [id]: { ...prev[id], [type]: !prev[id][type] },
    }));
  }

  async function handleSave() {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Notification preferences saved");
    } catch {
      toast.error("Failed to save preferences");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Configure how you receive notifications
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Preferences
        </Button>
      </div>

      {notificationSettings.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.items.map((item, i) => (
              <div key={item.id}>
                {i > 0 && <Separator className="mb-4" />}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">In-app</span>
                      <Switch
                        checked={prefs[item.id]?.inApp ?? false}
                        onCheckedChange={() => togglePref(item.id, "inApp")}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Email</span>
                      <Switch
                        checked={prefs[item.id]?.email ?? false}
                        onCheckedChange={() => togglePref(item.id, "email")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
