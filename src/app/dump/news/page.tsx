import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { PAGE_NAME } from "@/constants";
import { checkPostPermission } from "@/features/auth/utils/role";
import { AddFormLoading } from "@/features/dump/components/add-form-loading";
import { NewsAddProvider } from "@/features/dump/components/news-add-provider";
import { NewsContents } from "@/features/dump/components/news-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `DUMP NEWS | ${PAGE_NAME}`,
	description: "Dump news data to GitHub",
};

export default async function Page() {
	const hasPostPermission = await checkPostPermission();

	return (
		<>
			<Header
				title="DUMP NEWS"
				url="https://github.com/s-hirano-ist/s-public"
			/>
			{hasPostPermission && (
				<Suspense fallback={<AddFormLoading showCategory />}>
					<NewsAddProvider />
				</Suspense>
			)}
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<LoadingStack />}>
				<NewsContents />
			</Suspense>
		</>
	);
}
