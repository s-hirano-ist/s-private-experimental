"use client";

import { TableFooter } from "@/components/table/table-footer";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { queuedContentsContext } from "@/features/blog/stores/queued-contents-context";
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
import { ArrowUpDown, Lightbulb, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import type { QueuedContent } from "../stores/queued-contents-context";

const columns: ColumnDef<QueuedContent>[] = [
	{
		accessorKey: "category",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					カテゴリー
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("category")}</div>
		),
	},
	{
		accessorKey: "title",
		header: "タイトル",
		cell: ({ row }) => {
			return <div className="font-bold">{row.getValue("title")}</div>;
		},
	},
	{
		accessorKey: "quote",
		header: () => <></>,
		cell: ({ row }) => {
			return (
				row.getValue("quote") !== null && (
					<Dialog>
						<DialogTrigger>
							<Lightbulb />
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{row.getValue("title")}</DialogTitle>
								<DialogDescription>{row.getValue("quote")}</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				)
			);
		},
	},
	{
		accessorKey: "url",
		header: () => <></>,
		cell: ({ row }) => (
			<Link href={row.getValue("url")} target="_blank">
				<LinkIcon />
			</Link>
		),
	},
	// TODO: more settings at https://ui.shadcn.com/docs/components/data-table
];

type Props = {
	queuedContents: QueuedContent[];
};

export function QueuedTable({ queuedContents }: Props) {
	const [data, setData] = useRecoilState(queuedContentsContext);

	useEffect(() => {
		console.log("update data or newsDetail");
		setData(queuedContents);
	}, [queuedContents, setData]);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
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
		<div className="w-full">
			<Table>
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
							<TableCell colSpan={columns.length} className="h-24 text-center">
								データなし
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
