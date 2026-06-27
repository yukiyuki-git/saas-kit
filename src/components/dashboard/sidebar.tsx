"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Users,
  CreditCard,
  Code,
  Bell,
  FileText,
  Zap,
} from "lucide-react";

const sidebarNav = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "API Keys",
    href: "/settings/api-keys",
    icon: Code,
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 w-full">
      <Link
        href="/"
        className="flex items-center gap-2 font-bold text-lg mb-6 px-2"
      >
        <Zap className="h-5 w-5" />
        <span>SaaS Kit</span>
      </Link>
      {sidebarNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
