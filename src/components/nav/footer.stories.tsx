import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer";

const meta = {
	title: "Components/Nav/Footer",
	component: Footer,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		nextjs: {
			appDirectory: true,
		},
	},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {};
