import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/table/loading-stack";
import { BlogContents } from "@/features/blog/components/blog-contents";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<>
			<Header title="エクスポート待ち" />
			<Suspense fallback={<LoadingStack />}>
				<BlogContents />
			</Suspense>
		</>
	);
}
