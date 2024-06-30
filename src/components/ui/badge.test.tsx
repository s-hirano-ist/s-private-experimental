import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge component", () => {
	it("renders correctly with default props", () => {
		render(<Badge>Default Badge</Badge>);
		const badge = screen.getByText("Default Badge");
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass(
			"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		);
	});

	it("renders correctly with variant prop", () => {
		render(<Badge variant="secondary">Secondary Badge</Badge>);
		const badge = screen.getByText("Secondary Badge");
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass(
			"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		);
	});

	it("renders correctly with outline variant", () => {
		render(<Badge variant="outline">Outline Badge</Badge>);
		const badge = screen.getByText("Outline Badge");
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass("text-foreground");
	});

	it("applies additional className", () => {
		render(<Badge className="bg-black">Custom Class Badge</Badge>);
		const badge = screen.getByText("Custom Class Badge");
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveClass("bg-black");
	});
});
