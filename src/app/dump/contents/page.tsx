import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { PAGE_NAME } from "@/constants";
import { checkPostPermission } from "@/features/auth/lib/role";
import { AddFormLoading } from "@/features/dump/components/add-form-loading";
import { ContentsAddProvider } from "@/features/dump/components/contents-add-provider";
import { ContentsContents } from "@/features/dump/components/contents-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `s-private追加 | ${PAGE_NAME}`,
	description: "Dump contents data to GitHub",
};

export default async function Page() {
	const hasPostPermission = await checkPostPermission();
	return (
		<>
			<Header
				title="s-privateへ送信"
				url="https://github.com/s-hirano-ist/s-private"
			/>
			{hasPostPermission && (
				<Suspense fallback={<AddFormLoading showCategory={false} />}>
					<ContentsAddProvider />
				</Suspense>
			)}
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<LoadingStack />}>
				<ContentsContents />
			</Suspense>
		</>
	);
}
