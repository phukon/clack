import type { Meta, StoryObj } from "@storybook/react";
import DashLayout from "./layout";
import Dash from "./page";

const meta = {
  title: "Dash/DashLayout",
  component: DashLayout,

  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DashLayoutLight: Story = {
  args: {
    children: <Dash/>
  },
};
