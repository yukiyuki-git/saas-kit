import type { Meta, StoryObj } from "@storybook/react";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const WithLabelAndValue: Story = {
  render: () => (
    <Progress value={75} className="w-full max-w-sm">
      <ProgressLabel>Storage</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <Progress value={25} className="w-full">
        <ProgressLabel>Free Plan</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={60} className="w-full">
        <ProgressLabel>API Calls</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={90} className="w-full">
        <ProgressLabel>Storage</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  ),
};

export const UploadProgress: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading file.pdf</span>
        <span className="text-muted-foreground">67%</span>
      </div>
      <Progress value={67} />
    </div>
  ),
};
