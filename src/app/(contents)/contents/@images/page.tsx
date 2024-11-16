import { StatusCodeView } from "@/components/status-code-view";
import { Unauthorized } from "@/components/unauthorized";
import { ERROR_MESSAGES } from "@/constants";
import { checkAdminPermission } from "@/features/auth/utils/role";
import { AllImageStackProvider } from "@/features/image/components/all-image-stack-provider";
import { ImagePagination } from "@/features/image/components/image-pagination";
import { ImageStackSkeleton } from "@/features/image/components/image-stack-skeleton";
import { loggerError } from "@/pino";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		page?: string;
	};
}) {
	try {
		const hasAdminPermission = await checkAdminPermission();

		const currentPage = Number(searchParams?.page) || 1;

		return (
			<>
				{hasAdminPermission ? (
					<>
						<ImagePagination currentPage={currentPage} />
						<Suspense key={currentPage} fallback={<ImageStackSkeleton />}>
							<AllImageStackProvider page={currentPage} />
						</Suspense>
					</>
				) : (
					<Unauthorized />
				)}
			</>
		);
	} catch (error) {
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "ImagePage",
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
