import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
	title: "Components/UI/Select",
	component: Select,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Select>
			<SelectTrigger>
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Options</SelectLabel>
					<SelectItem value="option1">Option 1</SelectItem>
					<SelectItem value="option2">Option 2</SelectItem>
					<SelectItem value="option3">Option 3</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const WithCustomClass: Story = {
	render: () => (
		<Select>
			<SelectTrigger className="border-red-500">
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Options</SelectLabel>
					<SelectItem value="option1">Option 1</SelectItem>
					<SelectItem value="option2">Option 2</SelectItem>
					<SelectItem value="option3">Option 3</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const Disabled: Story = {
	render: () => (
		<Select disabled>
			<SelectTrigger>
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Options</SelectLabel>
					<SelectItem value="option1">Option 1</SelectItem>
					<SelectItem value="option2">Option 2</SelectItem>
					<SelectItem value="option3">Option 3</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const WithGroups: Story = {
	render: () => (
		<Select>
			<SelectTrigger>
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Group 1</SelectLabel>
					<SelectItem value="option1">Option 1</SelectItem>
					<SelectItem value="option2">Option 2</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Group 2</SelectLabel>
					<SelectItem value="option3">Option 3</SelectItem>
					<SelectItem value="option4">Option 4</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};

export const LongOptions: Story = {
	render: () => (
		<Select>
			<SelectTrigger>
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Options</SelectLabel>
					{[...Array(20)].map((_, i) => (
						<SelectItem key={String(i)} value={`option${i + 1}`}>
							Option {i + 1}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};
