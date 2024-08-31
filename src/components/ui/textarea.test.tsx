import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea component", () => {
	it("renders correctly", () => {
		render(<Textarea />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeInTheDocument();
	});

	it("applies default class names", () => {
		render(<Textarea />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass(
			"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		);
	});

	it("applies additional class names", () => {
		render(<Textarea className="font-bold" />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("font-bold");
		expect(textarea).toHaveClass(
			"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		);
	});

	it("accepts and displays value", () => {
		render(<Textarea defaultValue="Test value" />);
		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue("Test value");
	});
});
