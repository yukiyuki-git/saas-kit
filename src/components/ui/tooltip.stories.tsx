import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, HelpCircle, Settings } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex items-center justify-center p-10">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover me
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
        <Info className="h-4 w-4" />
      </TooltipTrigger>
      <TooltipContent>
        <p>More information about this feature</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const HelpTooltip: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">API Key</span>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Your unique API key for authentication.<br />Keep it secret!</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" />}>
          <Settings className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" />}>
          <HelpCircle className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>Help</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" />}>
          <Info className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>Info</TooltipContent>
      </Tooltip>
    </div>
  ),
};
