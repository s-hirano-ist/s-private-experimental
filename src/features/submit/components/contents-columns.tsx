import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { ContentsContext } from "@/features/dump/stores/contents-context";
import { sanitizeHref } from "@/utils/sanitize-href";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Lightbulb, Link as LinkIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

export const contentsColumns = (): ColumnDef<ContentsContext>[] => [
	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					ID
					<ArrowUpDown className="ml-2 size-4" />
				</Button>
			);
		},
		cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className="ml-2 size-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("status")}</div>
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
		cell: ({ row }) => {
			const href = sanitizeHref(row.getValue("url")) as Route;
			return (
				<Link href={href} target="_blank" scroll={false}>
					<LinkIcon />
				</Link>
			);
		},
	},
];
