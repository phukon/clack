import type { Meta, StoryObj } from "@storybook/react";
import Graph from "./page";

const meta = {
  title: "Graph/Graph",
  component: Graph,

  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Graph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GraphLight: Story = {
  args: {
    isPreview: true,
  },
};
