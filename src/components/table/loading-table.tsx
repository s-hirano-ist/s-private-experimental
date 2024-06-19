import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { TableFooter } from "./table-footer";

const NUMBER_OF_ROWS = 4;

export function LoadingTable() {
	return (
		<div className="w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<Skeleton className="h-8 w-full" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-8 w-full" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[...Array(NUMBER_OF_ROWS)].map((_, key) => {
						return (
							<TableRow key={String(key)}>
								<TableCell className="h-12">
									<Skeleton className="size-full" />
								</TableCell>
								<TableCell className="h-12">
									<Skeleton className="size-full" />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<TableFooter numberOfRows={0} />
		</div>
	);
}
