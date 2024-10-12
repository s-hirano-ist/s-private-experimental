import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { PAGE_NAME } from "@/constants";
import { checkPostPermission } from "@/features/auth/utils/role";
import { AddFormLoading } from "@/features/dump/components/add-form-loading";
import { ContentsAddProvider } from "@/features/dump/components/contents-add-provider";
import { ContentsContents } from "@/features/dump/components/contents-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `DUMP CONTENTS | ${PAGE_NAME}`,
	description: "Dump contents data to GitHub",
};

export default async function Page() {
	const hasPostPermission = await checkPostPermission();
	return (
		<>
			<Header
				title="DUMP CONTENTS"
				url="https://github.com/s-hirano-ist/s-private"
			/>
			{/* TODO: EDIT profileを追加 */}
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
