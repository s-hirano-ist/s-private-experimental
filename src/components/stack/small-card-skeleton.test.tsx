import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SmallCardSkeleton } from "./small-card-skeleton";

describe("SmallCardSkeleton", () => {
	it("renders the card with skeleton elements", () => {
		render(<SmallCardSkeleton />);

		const card = screen.getByTestId("small-card-skeleton");
		expect(card).toBeInTheDocument();
	});
});
