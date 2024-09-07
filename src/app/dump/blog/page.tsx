import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { PAGE_NAME } from "@/constants";
import { BlogAddProvider } from "@/features/dump/components/blog-add-provider";
import { BlogContents } from "@/features/dump/components/blog-contents";
import { LoadingForm } from "@/features/dump/components/loading-add-form";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `ブログ追加 | ${PAGE_NAME}`,
	description: "Dump blog data to GitHub",
};

export default function Page() {
	return (
		<>
			<Header title="ブログへ送信" url="https://github.com/s-hirano-ist/blog" />
			<Suspense fallback={<LoadingForm />}>
				<BlogAddProvider />
			</Suspense>
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<LoadingStack />}>
				<BlogContents />
			</Suspense>
		</>
	);
}
