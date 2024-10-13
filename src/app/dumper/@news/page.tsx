import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { checkPostPermission } from "@/features/auth/utils/role";
import { AddFormLoading } from "@/features/dump/components/add-form-loading";
import { NewsAddProvider } from "@/features/dump/components/news-add-provider";
import { NewsContents } from "@/features/dump/components/news-contents";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
	const hasPostPermission = await checkPostPermission();

	return (
		<>
			{hasPostPermission && (
				<Suspense fallback={<AddFormLoading showCategory />}>
					<NewsAddProvider />
				</Suspense>
			)}
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<LoadingStack />}>
				<NewsContents />
			</Suspense>
		</>
	);
}
