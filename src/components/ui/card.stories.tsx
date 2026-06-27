import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>Simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pro Plan</CardTitle>
          <Badge>Popular</Badge>
        </div>
        <CardDescription>For growing teams</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">$29</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 text-sm">
          <li>✓ Up to 5 team members</li>
          <li>✓ 50,000 API calls/month</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Priority support</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-[250px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Users
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1,234</div>
        <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
      </CardContent>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {["Revenue", "Users", "API Calls"].map((title) => (
        <Card key={title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
