import { TableSkeleton } from "@/components/table/table-skeleton";
import { Separator } from "@/components/ui/separator";
import { Unauthorized } from "@/components/unauthorized";
import { checkAdminPermission } from "@/features/auth/utils/role";
import { ContentsTable } from "@/features/update-status/components/contents-table";
import { NewsTable } from "@/features/update-status/components/news-table";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	return (
		<div className="px-2 sm:px-0">
			{hasAdminPermission ? (
				<div className="space-y-2">
					<h2 className="px-4 pt-4">NEWS</h2>
					<Suspense fallback={<TableSkeleton />}>
						<NewsTable />
					</Suspense>
					<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
					<h2 className="px-4 pt-4">CONTENTS</h2>
					<Suspense fallback={<TableSkeleton />}>
						<ContentsTable />
					</Suspense>
				</div>
			) : (
				<Unauthorized />
			)}
		</div>
	);
}
