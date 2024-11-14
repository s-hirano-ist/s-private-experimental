import { StackSkeleton } from "@/components/stack/stack-skeleton";
import { Separator } from "@/components/ui/separator";
import { checkPostPermission } from "@/features/auth/utils/role";
import { AddFormSkeleton } from "@/features/dump/components/add-form-skeleton";
import { AddImageProvider } from "@/features/dump/components/add-image-provider";
import { ImageStackProvider } from "@/features/dump/components/image-stack-provider";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
	const hasPostPermission = await checkPostPermission();

	return (
		<>
			{hasPostPermission && (
				<Suspense fallback={<AddFormSkeleton showCategory />}>
					<AddImageProvider />
				</Suspense>
			)}
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<StackSkeleton />}>
				<ImageStackProvider />
			</Suspense>
		</>
	);
}
