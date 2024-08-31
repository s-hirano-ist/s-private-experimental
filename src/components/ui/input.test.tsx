import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input component", () => {
	it("renders correctly with default props", () => {
		render(<Input placeholder="Enter text" />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
		expect(input).toHaveClass(
			"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		);
	});

	it("renders with given className", () => {
		render(<Input placeholder="Enter text" className="bg-white" />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
		expect(input).toHaveClass("bg-white");
	});

	it("accepts input value", () => {
		render(<Input placeholder="Enter text" />);
		const input = screen.getByPlaceholderText("Enter text");
		fireEvent.change(input, { target: { value: "test" } });
		expect(input.value).toBe("test");
	});

	it("supports ref forwarding", () => {
		const ref = createRef<HTMLInputElement>();
		render(<Input placeholder="Enter text" ref={ref} />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(ref.current).toBe(input);
	});

	it("renders with type prop", () => {
		render(<Input type="password" placeholder="Enter password" />);
		const input = screen.getByPlaceholderText("Enter password");
		expect(input).toHaveAttribute("type", "password");
	});

	it("is disabled when disabled prop is set", () => {
		render(<Input placeholder="Enter text" disabled />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeDisabled();
	});
});
