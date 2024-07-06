import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta = {
	title: "Components/UI/Table",
	component: Table,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Header 1</TableHead>
					<TableHead>Header 2</TableHead>
					<TableHead>Header 3</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Cell 1</TableCell>
					<TableCell>Cell 2</TableCell>
					<TableCell>Cell 3</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Cell 4</TableCell>
					<TableCell>Cell 5</TableCell>
					<TableCell>Cell 6</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>Footer 1</TableCell>
					<TableCell>Footer 2</TableCell>
					<TableCell>Footer 3</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};

export const WithCaption: Story = {
	render: () => (
		<Table>
			<TableCaption>This is a table caption</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Header 1</TableHead>
					<TableHead>Header 2</TableHead>
					<TableHead>Header 3</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Cell 1</TableCell>
					<TableCell>Cell 2</TableCell>
					<TableCell>Cell 3</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Cell 4</TableCell>
					<TableCell>Cell 5</TableCell>
					<TableCell>Cell 6</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

export const CustomStyles: Story = {
	render: () => (
		<Table className="border-collapse border border-gray-400">
			<TableHeader>
				<TableRow className="bg-gray-200">
					<TableHead className="border border-gray-400">Header 1</TableHead>
					<TableHead className="border border-gray-400">Header 2</TableHead>
					<TableHead className="border border-gray-400">Header 3</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="border border-gray-400">Cell 1</TableCell>
					<TableCell className="border border-gray-400">Cell 2</TableCell>
					<TableCell className="border border-gray-400">Cell 3</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="border border-gray-400">Cell 4</TableCell>
					<TableCell className="border border-gray-400">Cell 5</TableCell>
					<TableCell className="border border-gray-400">Cell 6</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow className="bg-gray-200">
					<TableCell className="border border-gray-400">Footer 1</TableCell>
					<TableCell className="border border-gray-400">Footer 2</TableCell>
					<TableCell className="border border-gray-400">Footer 3</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};

export const WithMultipleRows: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Header 1</TableHead>
					<TableHead>Header 2</TableHead>
					<TableHead>Header 3</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{[...Array(10)].map((_, index) => (
					<TableRow key={String(index)}>
						<TableCell>Cell {index * 3 + 1}</TableCell>
						<TableCell>Cell {index * 3 + 2}</TableCell>
						<TableCell>Cell {index * 3 + 3}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	),
};
