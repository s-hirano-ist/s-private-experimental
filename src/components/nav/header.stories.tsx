import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";

const meta = {
	title: "Components/Nav/Header",
	component: Header,
	tags: ["autodocs"],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
	args: { title: "Sample Title" },
};
