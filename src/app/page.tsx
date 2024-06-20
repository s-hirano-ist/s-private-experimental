import { LoadingTable } from "@/components/table/loading-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { QueueFooter } from "@/features/blog/components/queue-footer";
import { QueuedContents } from "@/features/blog/components/queued-contents";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>エクスポート待ち</CardTitle>
				<CardDescription>LocalのGitへ書き込み待ちのデータ一覧</CardDescription>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<LoadingTable />}>
					<QueuedContents />
				</Suspense>
			</CardContent>
			<CardFooter className="flex justify-between">
				<QueueFooter />
			</CardFooter>
		</Card>
	);
}
