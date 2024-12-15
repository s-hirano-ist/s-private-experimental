import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewsTable } from "./news-table";

vi.mock("server-only", () => {
	return {};
});

const mockData = [
	{
		id: 1,
		title: "News Title 1",
		quote: "This is a quote for news 1",
		url: "https://example.com/1",
		category: "example 1",
	},
	{
		id: 2,
		title: "News Title 2",
		quote: "This is a quote for news 2",
		url: "https://example.com/2",
		category: "example 2",
	},
];

vi.mock("@/features/news/components/news-columns", () => ({
	newsColumns: () => [
		{
			accessorKey: "title",
			header: "Title",
			// biome-ignore lint: for test
			cell: (info: any) => info.getValue(),
		},
		{
			accessorKey: "quote",
			header: "Quote",
			// biome-ignore lint: for test
			cell: (info: any) => info.getValue(),
		},
	],
}));

describe("NewsTable", () => {
	it("renders the table with data", () => {
		render(<NewsTable data={mockData} />);

		// Ensure table headers are rendered
		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("Quote")).toBeInTheDocument();

		// Ensure table rows are rendered
		expect(screen.getByText("News Title 1")).toBeInTheDocument();
		expect(screen.getByText("This is a quote for news 1")).toBeInTheDocument();
		expect(screen.getByText("News Title 2")).toBeInTheDocument();
		expect(screen.getByText("This is a quote for news 2")).toBeInTheDocument();
	});

	it("renders a message when no data is available", () => {
		render(<NewsTable data={[]} />);

		// Ensure no data message is displayed
		expect(screen.getByText("204")).toBeInTheDocument();
	});

	it("opens the dialog with correct data on row click", () => {
		render(<NewsTable data={mockData} />);

		// Click on a row
		const rows = screen.getAllByRole("row");
		fireEvent.click(rows[0]);

		// Ensure dialog opens with correct data
		expect(screen.getByText("News Title 1")).toBeInTheDocument();
		expect(screen.getByText("This is a quote for news 1")).toBeInTheDocument();
	});

	it("navigates through pagination", () => {
		const extendedData = Array.from({ length: 30 }, (_, i) => ({
			id: i + 1,
			title: `News Title ${i + 1}`,
			quote: `Quote ${i + 1}`,
			url: `https://example.com/${i + 1}`,
			category: `category ${i + 1}`,
		}));

		render(<NewsTable data={extendedData} />);

		// Ensure first page data is rendered
		expect(screen.getByText("News Title 1")).toBeInTheDocument();

		// Click next page button
		fireEvent.click(screen.getByRole("button", { name: "次のページ" }));

		// Ensure data from the next page is rendered
		expect(screen.getByText("News Title 11")).toBeInTheDocument();
	});
});
