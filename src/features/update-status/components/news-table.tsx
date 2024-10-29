"use server";
import { StatusCodeView } from "@/components/status-code-view";
import { hasAdminPermissionOrThrow } from "@/features/auth/utils/get-session";
import type { NewsAtom } from "@/features/dump/stores/news-atom";
import { DumpTable } from "@/features/update-status/components/dump-table";
import prisma from "@/prisma";

export async function NewsTable() {
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
			<DumpTable<NewsAtom>
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
