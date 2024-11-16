"use server";
import { StatusCodeView } from "@/components/status-code-view";
import { ERROR_MESSAGES } from "@/constants";
import { hasAdminPermissionOrThrow } from "@/features/auth/utils/get-session";
import { ContentsTable } from "@/features/contents/components/contents-table";
import { loggerError } from "@/pino";
import prisma from "@/prisma";

export async function ContentsTableProvider() {
	try {
		await hasAdminPermissionOrThrow();

		const contents = await prisma.contents.findMany({
			select: {
				id: true,
				title: true,
				quote: true,
				url: true,
				status: true,
			},
		});

		return (
			<ContentsTable
				data={contents.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						status: d.status,
					};
				})}
			/>
		);
	} catch (error) {
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "ContentsTable",
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
