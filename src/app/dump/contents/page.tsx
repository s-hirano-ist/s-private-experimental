import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { PAGE_NAME } from "@/constants";
import { ContentsAddForm } from "@/features/dump/components/contents-add-form";
import { ContentsContents } from "@/features/dump/components/contents-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `マイページ追加 | ${PAGE_NAME}`,
	description: "Dump contents data to GitHub",
};

export default function Page() {
	return (
		<>
			<Header
				title="s-privateへ送信"
				url="https://github.com/s-hirano-ist/s-private"
			/>
			<ContentsAddForm />
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<LoadingStack />}>
				<ContentsContents />
			</Suspense>
		</>
	);
}
