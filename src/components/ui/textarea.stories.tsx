import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Cannot type here",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
};

export const WithCounter: Story = {
  render: () => (
    <div className="grid w-full max-w-md gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself" maxLength={280} />
      <p className="text-sm text-muted-foreground">Max 280 characters</p>
    </div>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="contact-subject">Subject</Label>
        <Textarea id="contact-subject" placeholder="What's this about?" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-body">Message</Label>
        <Textarea id="contact-body" placeholder="Describe your issue in detail..." className="min-h-32" />
      </div>
      <Button>Send Message</Button>
    </div>
  ),
};
