import type { Meta, StoryObj } from "@storybook/react";
import { DumpCard } from "./dump-card";

const meta = {
	title: "Components/Stack/ContentStack",
	component: DumpCard,
	tags: ["autodocs"],
} satisfies Meta<typeof DumpCard>;

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
