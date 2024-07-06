import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/table/loading-stack";
import { NewsDetailContents } from "@/features/blog/components/news-detail-contents";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<>
			<Header title="エクスポート待ち" />
			<Suspense fallback={<LoadingStack />}>
				<NewsDetailContents />
			</Suspense>
		</>
	);
}
