import { getUnexportedNews } from "@/apis/prisma/fetch-news";
import { StatusCodeView } from "@/components/status-code-view";
import { NewsStack } from "./news-stack";

export async function NewsContents() {
	try {
		const unexportedNews = await getUnexportedNews();

		return (
			<NewsStack
				news={unexportedNews.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						category: d.category.name,
					};
				})}
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
