import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

describe("Table components", () => {
	it("renders Table correctly", () => {
		render(
			<Table>
				<TableCaption>Caption</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Header</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Cell</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Footer</TableCell>
					</TableRow>
				</TableFooter>
			</Table>,
		);

		expect(screen.getByText("Caption")).toBeInTheDocument();
		expect(screen.getByText("Header")).toBeInTheDocument();
		expect(screen.getByText("Cell")).toBeInTheDocument();
		expect(screen.getByText("Footer")).toBeInTheDocument();
	});
});
