"use server";
import { StatusCodeView } from "@/components/status-code-view";
import { ERROR_MESSAGES } from "@/constants";
import { hasAdminPermissionOrThrow } from "@/features/auth/utils/get-session";
import { NewsTable } from "@/features/news/components/news-table";
import { loggerError } from "@/pino";
import prisma from "@/prisma";

export async function NewsTableProvider() {
	try {
		await hasAdminPermissionOrThrow();

		const news = await prisma.news.findMany({
			select: {
				id: true,
				title: true,
				quote: true,
				url: true,
				status: true,
				Category: { select: { name: true } },
			},
		});

		return (
			<NewsTable
				data={news.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						status: d.status,
						category: d.Category.name,
					};
				})}
			/>
		);
	} catch (error) {
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "NewsTable",
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
