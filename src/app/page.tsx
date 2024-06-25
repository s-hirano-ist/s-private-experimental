import { Header } from "@/components/nav/header";
import { LoadingTable } from "@/components/table/loading-table";
import { QueuedContents } from "@/features/blog/components/queued-contents";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<div className="w-full">
			<Header
				title="エクスポート待ち"
				description="LocalのGitへ書き込み待ちのデータ一覧"
			/>
			<Suspense fallback={<LoadingTable />}>
				<QueuedContents />
			</Suspense>
		</div>
	);
}
