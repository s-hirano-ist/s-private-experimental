import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Label } from "./label";

describe("Label component", () => {
	it("renders correctly with default props", () => {
		render(<Label>Label Text</Label>);
		const label = screen.getByText("Label Text");
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass(
			"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		);
	});

	it("renders with given className", () => {
		render(<Label className="bg-white">Label Text</Label>);
		const label = screen.getByText("Label Text");
		expect(label).toBeInTheDocument();
		expect(label).toHaveClass("bg-white");
	});

	it("supports ref forwarding", () => {
		const ref = createRef<HTMLLabelElement>();
		render(<Label ref={ref}>Label Text</Label>);
		const label = screen.getByText("Label Text");
		expect(ref.current).toBe(label);
	});
});
