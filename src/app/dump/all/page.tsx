import { Header } from "@/components/nav/header";
import { LoadingTable } from "@/components/table/loading-table";
import { Separator } from "@/components/ui/separator";
import { PAGE_NAME } from "@/constants";
import { BlogTable } from "@/features/dump/components/blog-table";
import { MypageTable } from "@/features/dump/components/mypage-table";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `全データ | ${PAGE_NAME}`,
	description: "All data of blog/mypage dump",
};

export default function Home() {
	return (
		<div className="space-y-2">
			<Header title="全データ" />
			<h2 className="px-4">ブログ</h2>
			<Suspense fallback={<LoadingTable />}>
				<BlogTable />
			</Suspense>
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<h2 className="px-4">マイページ</h2>
			<Suspense fallback={<LoadingTable />}>
				<MypageTable />
			</Suspense>
		</div>
	);
}
