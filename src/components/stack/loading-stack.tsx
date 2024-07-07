import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LOADING_STACK_SIZE } from "@/constants";
import { Skeleton } from "../ui/skeleton";

export function LoadingStack() {
	return (
		<div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:gap-4">
			{[...Array(LOADING_STACK_SIZE)].map((_, index) => {
				return (
					<Card className="hover:bg-primary/10" key={String(index)}>
						<CardHeader>
							<div className="flex gap-4">
								<Skeleton className="h-6 w-8" />
								<Skeleton className="h-6 w-24" />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>
								<Skeleton className="h-4 w-full" />
							</CardTitle>
							<CardDescription className="truncate">
								<Skeleton className="h-4 w-full" />
							</CardDescription>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
