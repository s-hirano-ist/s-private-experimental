import { getUnexportedBlog } from "@/apis/prisma/fetch-blog";
import { ErrorView } from "@/components/error-view";
import { BlogStack } from "./blog-stack";

export async function BlogContents() {
	try {
		const blog = await getUnexportedBlog();

		return (
			<BlogStack
				blog={blog.map((d) => {
					return {
						id: d.id,
						title: d.title,
						quote: d.quote,
						url: d.url,
						category: d.category?.category ?? "",
					};
				})}
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
