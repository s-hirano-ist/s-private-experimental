"use client";
import { StatusCodeView } from "@/components/status-code-view";
import { TableFooter } from "@/components/table/table-footer";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { contentsColumns } from "@/features/con/components/contents-columns";
import { DeleteContentsButton } from "@/features/con/components/delete-contents-button";
import type { ContentsAtom } from "@/features/con/stores/contents-atom";
import {
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

type Props = {
	data: ContentsAtom[];
};

export function ContentsTable({ data }: Props) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const [open, setOpen] = useState(false);
	const [dialogData, setDialogData] = useState<ContentsAtom>();

	const table = useReactTable({
		data,
		columns: contentsColumns(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: { sorting, columnFilters, columnVisibility },
	});

	const handleClick = (rowData: ContentsAtom) => {
		setDialogData(rowData);
		setOpen(true);
	};

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
							<TableRow key={row.id} onClick={() => handleClick(row.original)}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={contentsColumns.length}
								className="mx-auto flex"
							>
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
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{dialogData?.title ?? ""}</DialogTitle>
						<DialogDescription>{dialogData?.quote ?? ""}</DialogDescription>
					</DialogHeader>
					<DeleteContentsButton id={dialogData?.id} />
				</DialogContent>
			</Dialog>
		</div>
	);
}
