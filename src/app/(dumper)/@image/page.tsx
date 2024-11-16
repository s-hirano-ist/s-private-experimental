import { StatusCodeView } from "@/components/status-code-view";
import { Separator } from "@/components/ui/separator";
import { ERROR_MESSAGES } from "@/constants";
import { checkPostPermission } from "@/features/auth/utils/role";
import { AddFormSkeleton } from "@/features/dump/components/add-form-skeleton";
import { AddImageProvider } from "@/features/image/components/add-image-provider";
import { ImageStackProvider } from "@/features/image/components/image-stack-provider";
import { ImageStackSkeleton } from "@/features/image/components/image-stack-skeleton";
import { loggerError } from "@/pino";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
	try {
		const hasPostPermission = await checkPostPermission();

		return (
			<>
				{hasPostPermission && (
					<Suspense fallback={<AddFormSkeleton showCategory />}>
						<AddImageProvider />
					</Suspense>
				)}
				<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
				<Suspense fallback={<ImageStackSkeleton />}>
					<ImageStackProvider />
				</Suspense>
			</>
		);
	} catch (error) {
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "ImageStackProvider",
				status: 500,
			},
			error,
		);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView statusCode="500" />
			</div>
		);
	}
}
