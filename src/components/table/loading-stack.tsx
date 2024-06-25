import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const NUMBER_OF_ROWS = 32;

export function LoadingStack() {
	return (
		<div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:gap-4">
			{[...Array(NUMBER_OF_ROWS)].map((key, _) => {
				return (
					<Card className="hover:bg-primary/10" key={key}>
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
