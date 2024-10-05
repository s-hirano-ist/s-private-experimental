"use client";
import { StatusCodeView } from "@/components/status-code-view";
import { TableFooter } from "@/components/table/table-footer";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ERROR_MESSAGES } from "@/constants";
import { newsColumns } from "@/features/dump/components/news-columns";
import type { ContentsContext } from "@/features/dump/stores/contents-context";
import type { NewsContext } from "@/features/dump/stores/news-context";
import { contentsColumns } from "@/features/dump/components/contents-columns";
import type { ContentName } from "@/types/content-name";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

type Props<T extends NewsContext | ContentsContext> = {
	data: T[];
	columnType: ContentName;
};

export function DumpTable<T extends NewsContext | ContentsContext>({
	data,
	columnType,
}: Props<T>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const columns = () => {
		switch (columnType) {
			case "NEWS":
				return newsColumns();
			case "CONTENTS":
				return contentsColumns();
			default:
				throw new Error(ERROR_MESSAGES.UNEXPECTED);
		}
	};

	const table = useReactTable({
		data,
		columns: columns() as ColumnDef<T>[],
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: { sorting, columnFilters, columnVisibility },
	});

	return (
		<div className="p-4">
			<Table className="min-w-[1080px] overflow-x-scroll">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="mx-auto flex">
								<StatusCodeView statusCode="204" />
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TableFooter
				numberOfRows={table.getFilteredRowModel().rows.length}
				onClickPrevious={() => table.previousPage()}
				previousButtonDisabled={!table.getCanPreviousPage()}
				onClickNext={() => table.nextPage()}
				nextButtonDisabled={!table.getCanNextPage()}
			/>
		</div>
	);
}
