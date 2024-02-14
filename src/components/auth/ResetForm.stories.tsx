import type { Meta, StoryObj } from "@storybook/react";
import { ResetForm } from "./ResetForm";

const meta = {
  title: "Auth/ResetForm",
  component: ResetForm,

  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ResetForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResetFormLight: Story = {};
