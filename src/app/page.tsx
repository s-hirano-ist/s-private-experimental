import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/table/loading-stack";
import { QueuedContents } from "@/features/blog/components/queued-contents";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<>
			<Header
				title="エクスポート待ち"
				description="LocalのGitへ書き込み待ちのデータ一覧"
			/>
			<Suspense fallback={<LoadingStack />}>
				<QueuedContents />
			</Suspense>
		</>
	);
}
