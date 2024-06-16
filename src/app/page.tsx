import { ButtonSpinner } from "@/components/button-spinner";
import { LoadingTable } from "@/components/table/loading-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { QueueDrawer } from "@/features/blog/components/queue-drawer";
import { QueuedList } from "@/features/blog/components/queued-list";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>エクスポート待ち</CardTitle>
				<CardDescription>LocalのGitへ書き込み待ちのデータ一覧</CardDescription>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<LoadingTable />}>
					<QueuedList />
				</Suspense>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Suspense fallback={<ButtonSpinner numberOfRows={2} />}>
					<QueueDrawer />
				</Suspense>
			</CardFooter>
		</Card>
	);
}
