import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LOADING_STACK_SIZE } from "@/constants";

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
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
