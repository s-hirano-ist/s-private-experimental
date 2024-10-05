import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { PAGE_NAME } from "@/constants";
import { AddFormLoading } from "@/features/dump/components/add-form-loading";
import { NewsAddProvider } from "@/features/dump/components/news-add-provider";
import { NewsContents } from "@/features/dump/components/news-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `s-public追加 | ${PAGE_NAME}`,
	description: "Dump news data to GitHub",
};

export default async function Page() {
	return (
		<>
			<Header
				title="s-publicへ送信"
				url="https://github.com/s-hirano-ist/s-public"
			/>
			<Suspense fallback={<AddFormLoading showCategory />}>
				<NewsAddProvider />
			</Suspense>
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<LoadingStack />}>
				<NewsContents />
			</Suspense>
		</>
	);
}
