import { getAllBlog } from "@/apis/prisma/fetch-blog";
import { ErrorView } from "@/components/error-view";
import { ContentsTable } from "@/components/table/contents-table";
import type { BlogContext } from "../stores/blog-context";

export async function BlogTable() {
	try {
		const blog = await getAllBlog();

		return (
			<ContentsTable<BlogContext>
				data={blog.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						status: d.status,
						category: d.category?.category ?? "",
					};
				})}
				columnType="blog"
			/>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return (
			<div className="flex flex-col items-center">
				<ErrorView />
			</div>
		);
	}
}
