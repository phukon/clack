import type { Meta, StoryObj } from "@storybook/react";
import RegisterForm from "./RegisterForm";

const meta = {
  title: "Auth/RegisterForm",
  component: RegisterForm,

  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegisterFormLight: Story = {};
