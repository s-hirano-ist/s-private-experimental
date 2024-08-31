import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from "./select";

describe.skip("Select component", () => {
	it("renders SelectTrigger and opens SelectContent", async () => {
		render(
			<Select>
				<SelectTrigger>Open Select</SelectTrigger>
				<SelectContent>
					<SelectItem value="item-1">Item 1</SelectItem>
					<SelectItem value="item-2">Item 2</SelectItem>
				</SelectContent>
			</Select>,
		);

		// Triggerが表示されていることを確認
		const trigger = screen.getByText("Open Select");
		expect(trigger).toBeInTheDocument();

		// Triggerをクリックしてセレクトを開く
		fireEvent.mouseDown(trigger);

		// セレクトの内容が表示されていることを確認
		await waitFor(() => {
			const item1 = screen.getByText("Item 1");
			const item2 = screen.getByText("Item 2");
			expect(item1).toBeInTheDocument();
			expect(item2).toBeInTheDocument();
		});
	});

	it("selects an item when clicked", async () => {
		render(
			<Select>
				<SelectTrigger>Select an Item</SelectTrigger>
				<SelectContent>
					<SelectItem value="item-1">Item 1</SelectItem>
					<SelectItem value="item-2">Item 2</SelectItem>
				</SelectContent>
			</Select>,
		);

		// Triggerをクリックしてセレクトを開く
		const trigger = screen.getByText("Select an Item");
		fireEvent.mouseDown(trigger);

		// アイテムをクリックして選択
		await waitFor(() => {
			const item1 = screen.getByText("Item 1");
			fireEvent.click(item1);
			// Triggerが選択されたアイテムで更新されていることを確認
			expect(trigger).toHaveTextContent("Item 1");
		});
	});

	it("renders with a custom className", () => {
		render(
			<Select>
				<SelectTrigger className="bg-white">Open Select</SelectTrigger>
				<SelectContent>
					<SelectItem value="item-1">Item 1</SelectItem>
				</SelectContent>
			</Select>,
		);

		const trigger = screen.getByText("Open Select");
		expect(trigger).toBeInTheDocument();
		expect(trigger).toHaveClass("bg-white");
	});

	it("renders SelectLabel correctly", async () => {
		render(
			<Select>
				<SelectTrigger>Open Select</SelectTrigger>
				<SelectContent>
					<SelectLabel>Group Label</SelectLabel>
					<SelectItem value="item-1">Item 1</SelectItem>
				</SelectContent>
			</Select>,
		);

		// Triggerをクリックしてセレクトを開く
		const trigger = screen.getByText("Open Select");
		fireEvent.mouseDown(trigger);

		// ラベルが表示されていることを確認
		await waitFor(() => {
			const label = screen.getByText("Group Label");
			expect(label).toBeInTheDocument();
		});
	});

	it("renders SelectGroup correctly", async () => {
		render(
			<Select>
				<SelectTrigger>Open Select</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Group 1</SelectLabel>
						<SelectItem value="item-1">Item 1</SelectItem>
					</SelectGroup>
					<SelectGroup>
						<SelectLabel>Group 2</SelectLabel>
						<SelectItem value="item-2">Item 2</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>,
		);

		// Triggerをクリックしてセレクトを開く
		const trigger = screen.getByText("Open Select");
		fireEvent.mouseDown(trigger);

		// グループラベルとアイテムが表示されていることを確認
		await waitFor(() => {
			const group1Label = screen.getByText("Group 1");
			const group2Label = screen.getByText("Group 2");
			const item1 = screen.getByText("Item 1");
			const item2 = screen.getByText("Item 2");
			expect(group1Label).toBeInTheDocument();
			expect(group2Label).toBeInTheDocument();
			expect(item1).toBeInTheDocument();
			expect(item2).toBeInTheDocument();
		});
	});
});
