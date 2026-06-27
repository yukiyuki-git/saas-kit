import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-green-100 text-green-800">Active</Badge>
      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      <Badge className="bg-blue-100 text-blue-800">Pro</Badge>
      <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>
    </div>
  ),
};

export const MethodBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-green-100 text-green-800 font-mono">GET</Badge>
      <Badge className="bg-blue-100 text-blue-800 font-mono">POST</Badge>
      <Badge className="bg-yellow-100 text-yellow-800 font-mono">PATCH</Badge>
      <Badge className="bg-red-100 text-red-800 font-mono">DELETE</Badge>
    </div>
  ),
};
