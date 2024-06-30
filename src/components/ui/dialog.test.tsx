import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

describe("Dialog components", () => {
	it("renders DialogTrigger and opens DialogContent", () => {
		render(
			<Dialog>
				<DialogTrigger>Open Dialog</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Dialog Title</DialogTitle>
						<DialogDescription>Dialog Description</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose>Close</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>,
		);

		// Triggerが表示されていることを確認
		const trigger = screen.getByText("Open Dialog");
		expect(trigger).toBeInTheDocument();

		// Triggerをクリックしてダイアログを開く
		fireEvent.click(trigger);

		// ダイアログの内容が表示されていることを確認
		const title = screen.getByText("Dialog Title");
		const description = screen.getByText("Dialog Description");
		const closeButton = screen.getByText("Close");
		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(closeButton).toBeInTheDocument();
	});

	it("closes the dialog when DialogClose is clicked", () => {
		render(
			<Dialog>
				<DialogTrigger>Open Dialog</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Dialog Title</DialogTitle>
						<DialogDescription>Dialog Description</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose>Close</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>,
		);

		// Triggerをクリックしてダイアログを開く
		const trigger = screen.getByText("Open Dialog");
		fireEvent.click(trigger);

		// ダイアログの内容が表示されていることを確認
		const title = screen.getByText("Dialog Title");
		expect(title).toBeInTheDocument();

		// Closeボタンをクリックしてダイアログを閉じる
		const closeButton = screen.getByText("Close");
		fireEvent.click(closeButton);

		// ダイアログの内容が閉じられたことを確認
		expect(title).not.toBeInTheDocument();
	});
});
