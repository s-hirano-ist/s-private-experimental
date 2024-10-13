import type { Meta, StoryObj } from "@storybook/react";
import { StackSkeleton } from "./stack-skeleton";

const meta = {
	title: "Components/Stack/StackSkeleton",
	component: StackSkeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof StackSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
