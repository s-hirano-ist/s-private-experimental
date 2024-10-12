import { Header } from "@/components/nav/header";
import { LoadingTable } from "@/components/table/loading-table";
import { Separator } from "@/components/ui/separator";
import { Unauthorized } from "@/components/unauthorized";
import { PAGE_NAME } from "@/constants";
import { checkAdminPermission } from "@/features/auth/utils/role";
import { ContentsTable } from "@/features/update-status/components/contents-table";
import { NewsTable } from "@/features/update-status/components/news-table";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `全データ | ${PAGE_NAME}`,
	description: "All data of news/contents dump",
};

export default async function Home() {
	const hasAdminPermission = await checkAdminPermission();

	return (
		<div className="space-y-2">
			<Header title="全データ" />
			{hasAdminPermission ? (
				<>
					<h2 className="px-4">s-public</h2>
					<Suspense fallback={<LoadingTable />}>
						<NewsTable />
					</Suspense>
					<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
					<h2 className="px-4">s-private</h2>
					<Suspense fallback={<LoadingTable />}>
						<ContentsTable />
					</Suspense>
				</>
			) : (
				<Unauthorized />
			)}
		</div>
	);
}
