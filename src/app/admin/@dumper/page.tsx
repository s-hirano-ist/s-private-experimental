import { LoadingTable } from "@/components/table/loading-table";
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
		<>
			{hasAdminPermission ? (
				<div className="space-y-2">
					<h2 className="px-4">NEWS</h2>
					<Suspense fallback={<LoadingTable />}>
						<NewsTable />
					</Suspense>
					<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
					<h2 className="px-4">CONTENTS</h2>
					<Suspense fallback={<LoadingTable />}>
						<ContentsTable />
					</Suspense>
				</div>
			) : (
				<Unauthorized />
			)}
		</>
	);
}
