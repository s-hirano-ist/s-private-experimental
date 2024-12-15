import type { Meta, StoryObj } from "@storybook/react";
import { SmallCardSkeleton } from "./small-card-skeleton";

const meta = {
	title: "Components/Stack/SmallCardSkeleton",
	component: SmallCardSkeleton,
	tags: ["autodocs"],
} satisfies Meta<typeof SmallCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
