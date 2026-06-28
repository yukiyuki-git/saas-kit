import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" placeholder="John Doe" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="required-field">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input id="required-field" type="email" placeholder="you@example.com" required />
    </div>
  ),
};

export const FormLabels: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="grid items-center gap-1.5">
        <Label htmlFor="form-name">Name</Label>
        <Input id="form-name" placeholder="Your name" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="form-email">Email</Label>
        <Input id="form-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="form-company">Company</Label>
        <Input id="form-company" placeholder="Acme Inc." />
      </div>
    </div>
  ),
};
