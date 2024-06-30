import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton component", () => {
	it("renders correctly", () => {
		render(<Skeleton />);
		const skeleton = screen.getByRole("presentation");
		expect(skeleton).toBeInTheDocument();
	});

	it("applies the default class names", () => {
		render(<Skeleton />);
		const skeleton = screen.getByRole("presentation");
		expect(skeleton).toHaveClass("animate-pulse rounded-md bg-primary/10");
	});

	it("applies additional class names", () => {
		render(<Skeleton className="text-white" />);
		const skeleton = screen.getByRole("presentation");
		expect(skeleton).toHaveClass("text-white");
		expect(skeleton).toHaveClass("animate-pulse rounded-md bg-primary/10");
	});
});
