import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { SKELETON_TABLE_ROWS } from "@/constants";
import { TableFooter } from "./table-footer";

export function TableSkeleton() {
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
					{[...Array(SKELETON_TABLE_ROWS - 1)].map((_, key) => {
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
