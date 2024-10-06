"use server";
import { getAllNews } from "@/apis/prisma/fetch-news";
import { StatusCodeView } from "@/components/status-code-view";
import type { NewsContext } from "@/features/dump/stores/news-context";
import { DumpTable } from "@/features/submit/components/dump-table";

export async function NewsTable() {
	try {
		const news = await getAllNews();

		return (
			<DumpTable<NewsContext>
				data={news.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						status: d.status,
						category: d.category.name,
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
