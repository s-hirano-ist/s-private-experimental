import type { Meta, StoryObj } from "@storybook/react";
import { ContentStack } from "./content-stack";

const meta = {
	title: "Components/Stack/ContentStack",
	component: ContentStack,
	tags: ["autodocs"],
} satisfies Meta<typeof ContentStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: 1,
		title: "サンプルタイトル",
		quote: "Sample quote",
		url: "https://example.com",
		category: "サンプルカテゴリー",
	},
};
