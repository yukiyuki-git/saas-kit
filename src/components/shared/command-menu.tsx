"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Settings,
  Users,
  CreditCard,
  Code,
  Bell,
  Search,
  FileText,
  Zap,
  Globe,
} from "lucide-react";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function navigate(path: string) {
    setOpen(false);
    router.push(path);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigate("/")}>
            <Zap className="mr-2 h-4 w-4" />
            Home
          </CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem onSelect={() => navigate("/team")}>
            <Users className="mr-2 h-4 w-4" />
            Team
          </CommandItem>
          <CommandItem onSelect={() => navigate("/billing")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => navigate("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            General
          </CommandItem>
          <CommandItem onSelect={() => navigate("/settings/security")}>
            <Search className="mr-2 h-4 w-4" />
            Security
          </CommandItem>
          <CommandItem onSelect={() => navigate("/settings/api-keys")}>
            <Code className="mr-2 h-4 w-4" />
            API Keys
          </CommandItem>
          <CommandItem onSelect={() => navigate("/settings/notifications")}>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Resources">
          <CommandItem onSelect={() => navigate("/docs")}>
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </CommandItem>
          <CommandItem onSelect={() => navigate("/api-docs")}>
            <Globe className="mr-2 h-4 w-4" />
            API Reference
          </CommandItem>
          <CommandItem onSelect={() => navigate("/pricing")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Pricing
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
