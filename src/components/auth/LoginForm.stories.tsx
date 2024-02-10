import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";

const meta = {
  title: "Auth/LoginForm",
  component: LoginForm,

  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginFormLight: Story = {};
