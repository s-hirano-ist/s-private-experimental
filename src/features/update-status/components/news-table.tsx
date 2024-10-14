"use server";
import { StatusCodeView } from "@/components/status-code-view";
import { checkSelfAdminRoleOrThrow } from "@/features/auth/utils/get-session";
import type { NewsContext } from "@/features/dump/stores/news-context";
import { DumpTable } from "@/features/update-status/components/dump-table";
import prisma from "@/prisma";

export async function NewsTable() {
	try {
		await checkSelfAdminRoleOrThrow();

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
			<DumpTable<NewsContext>
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
				columnType="NEWS"
			/>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView statusCode="500" />
			</div>
		);
	}
}
