import { SKELETON_TABLE_ROWS } from "@/constants";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TableSkeleton } from "./table-skeleton";

describe("TableSkeleton", () => {
	it("should render the table with skeleton headers and rows", () => {
		render(<TableSkeleton />);

		// Check for the presence of the table headers
		const headers = screen.getAllByRole("columnheader");
		expect(headers).toHaveLength(2);

		// Check for the presence of the skeleton elements in headers
		for (const header of headers) {
			// FIXME: get by roleに変更
			expect(header.querySelector(".animate-pulse")).toBeInTheDocument();
		}

		// Check for the presence of the table rows
		const rows = screen.getAllByRole("row");
		expect(rows).toHaveLength(SKELETON_TABLE_ROWS);

		// Check for the presence of the skeleton elements in rows
		for (const row of rows) {
			const cells = row.querySelectorAll("td");
			for (const cell of cells) {
				// FIXME: get by roleに変更
				expect(cell.querySelector(".animate-pulse")).toBeInTheDocument();
			}
		}
	});

	it("should render the TableFooter with 0 rows", () => {
		render(<TableSkeleton />);

		// Check for the presence of the TableFooter
		expect(screen.getByText("0")).toBeInTheDocument();
		expect(screen.getByText("個の項目")).toBeInTheDocument();
		expect(screen.getByText("前のページ")).toBeInTheDocument();
		expect(screen.getByText("次のページ")).toBeInTheDocument();
	});
});
