import { StackSkeleton } from "@/components/stack/stack-skeleton";
import { Separator } from "@/components/ui/separator";
import { checkPostPermission } from "@/features/auth/utils/role";
import { AddFormSkeleton } from "@/features/dump/components/add-form-skeleton";
import { AddNewsProvider } from "@/features/news/components/add-news-provider";
import { NewsStackProvider } from "@/features/news/components/news-stack-provider";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
	const hasPostPermission = await checkPostPermission();

	return (
		<>
			{hasPostPermission && (
				<Suspense fallback={<AddFormSkeleton showCategory />}>
					<AddNewsProvider />
				</Suspense>
			)}
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<StackSkeleton />}>
				<NewsStackProvider />
			</Suspense>
		</>
	);
}
