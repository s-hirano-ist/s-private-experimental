import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { checkPostPermission } from "@/features/auth/utils/role";
import { AddFormLoading } from "@/features/dump/components/add-form-loading";
import { ContentsAddProvider } from "@/features/dump/components/contents-add-provider";
import { ContentsContents } from "@/features/dump/components/contents-contents";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
	const hasPostPermission = await checkPostPermission();
	return (
		<>
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
