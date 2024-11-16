import { TableSkeleton } from "@/components/table/table-skeleton";
import { Separator } from "@/components/ui/separator";
import { Unauthorized } from "@/components/unauthorized";
import { checkAdminPermission } from "@/features/auth/utils/role";
import { ContentsTableProvider } from "@/features/contents/components/contents-table-provider";
import { NewsTableProvider } from "@/features/news/components/news-table-provider";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	return (
		<div className="px-2">
			{hasAdminPermission ? (
				<div className="space-y-2">
					<h2 className="px-4 pt-4">NEWS</h2>
					<Suspense fallback={<TableSkeleton />}>
						<NewsTableProvider />
					</Suspense>
					<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
					<h2 className="px-4 pt-4">CONTENTS</h2>
					<Suspense fallback={<TableSkeleton />}>
						<ContentsTableProvider />
					</Suspense>
				</div>
			) : (
				<Unauthorized />
			)}
		</div>
	);
}
