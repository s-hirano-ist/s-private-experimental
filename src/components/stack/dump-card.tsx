import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type Props = {
	id: number;
	title: string;
	quote: string | null;
	url: string;
	category?: string;
};

export function DumpCard({ id, title, quote, url, category }: Props) {
	return (
		<Link href={new URL(url)} target="_blank" scroll={false}>
			<Card className="hover:bg-secondary">
				<CardHeader>
					<div className="flex gap-4">
						<Badge>{id}</Badge>
						{category && <Badge variant="outline">{category}</Badge>}
					</div>
				</CardHeader>
				<CardContent>
					<CardTitle>{title}</CardTitle>
					<CardDescription className="truncate">
						{quote ? quote : "　"}
					</CardDescription>
				</CardContent>
			</Card>
		</Link>
	);
}

export function DumpLoadingCard() {
	return (
		<Card className="hover:bg-primary/10">
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
}
