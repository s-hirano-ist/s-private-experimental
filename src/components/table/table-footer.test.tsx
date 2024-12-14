import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableFooter } from "./table-footer";

describe("TableFooter Component", () => {
	it("should render the correct number of rows", () => {
		render(<TableFooter numberOfRows={10} />);
		expect(
			screen.getByText((content, element) => {
				if (!element) return false;
				const hasText = (node: Element) => node.textContent === "10個の項目";
				const elementHasText = hasText(element);
				const childrenDontHaveText = Array.from(element.children).every(
					(child) => !hasText(child),
				);
				return elementHasText && childrenDontHaveText;
			}),
		).toBeInTheDocument();
	});

	it("should render both buttons as disabled by default", () => {
		render(<TableFooter numberOfRows={10} />);
		const previousButton = screen.getByText("前のページ");
		const nextButton = screen.getByText("次のページ");

		expect(previousButton).toBeDisabled();
		expect(nextButton).toBeDisabled();
	});

	it("should enable the buttons when props allow it", () => {
		render(
			<TableFooter
				numberOfRows={10}
				previousButtonDisabled={false}
				nextButtonDisabled={false}
			/>,
		);
		const previousButton = screen.getByText("前のページ");
		const nextButton = screen.getByText("次のページ");

		expect(previousButton).not.toBeDisabled();
		expect(nextButton).not.toBeDisabled();
	});

	it("should call onClickPrevious when the previous button is clicked", () => {
		const onClickPrevious = vi.fn();
		render(
			<TableFooter
				numberOfRows={10}
				onClickPrevious={onClickPrevious}
				previousButtonDisabled={false}
			/>,
		);
		const previousButton = screen.getByText("前のページ");
		fireEvent.click(previousButton);

		expect(onClickPrevious).toHaveBeenCalled();
	});

	it("should call onClickNext when the next button is clicked", () => {
		const onClickNext = vi.fn();
		render(
			<TableFooter
				numberOfRows={10}
				onClickNext={onClickNext}
				nextButtonDisabled={false}
			/>,
		);
		const nextButton = screen.getByText("次のページ");
		fireEvent.click(nextButton);

		expect(onClickNext).toHaveBeenCalled();
	});

	it("should not call onClick handlers when buttons are disabled", () => {
		const onClickPrevious = vi.fn();
		const onClickNext = vi.fn();
		render(
			<TableFooter
				numberOfRows={10}
				onClickPrevious={onClickPrevious}
				onClickNext={onClickNext}
			/>,
		);
		const previousButton = screen.getByText("前のページ");
		const nextButton = screen.getByText("次のページ");

		fireEvent.click(previousButton);
		fireEvent.click(nextButton);

		expect(onClickPrevious).not.toHaveBeenCalled();
		expect(onClickNext).not.toHaveBeenCalled();
	});
});
