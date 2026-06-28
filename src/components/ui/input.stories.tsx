import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Mail, Lock } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "url", "tel"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "you@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="you@example.com" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
      <Input className="pl-8" placeholder="Search..." />
    </div>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <Input id="login-email" type="email" className="pl-8" placeholder="you@example.com" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          <Input id="login-password" type="password" className="pl-8" placeholder="••••••••" />
        </div>
      </div>
    </div>
  ),
};
