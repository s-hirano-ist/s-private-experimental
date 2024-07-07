import { getCategories } from "@/apis/prisma/fetch-category";
import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/table/loading-stack";
import { Separator } from "@/components/ui/separator";
import { BlogAddForm } from "@/features/blog/components/blog-add-form";
import { BlogContents } from "@/features/blog/components/blog-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Blog | Dump",
	description: "Dump blog data to GitHub",
};

export default async function Page() {
	try {
		const categories = await getCategories();
		return (
			<>
				<Header
					title="ブログへ送信"
					url="https://github.com/s-hirano-ist/blog"
				/>
				<BlogAddForm categories={categories} />
				<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
				<Suspense fallback={<LoadingStack />}>
					<BlogContents />
				</Suspense>
			</>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
