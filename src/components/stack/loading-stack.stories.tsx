import type { Meta, StoryObj } from "@storybook/react";
import { LoadingStack } from "./loading-stack";

const meta = {
	title: "Components/Stack/LoadingStack",
	component: LoadingStack,
	tags: ["autodocs"],
} satisfies Meta<typeof LoadingStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
