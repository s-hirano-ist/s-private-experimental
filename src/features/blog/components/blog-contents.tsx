import { getUnexportedBlog } from "@/apis/prisma/fetch-blog";
import { StatusCodeView } from "@/components/status-code-view";
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
						category: d.category?.name ?? "",
					};
				})}
			/>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView
					statusCode={500}
					statusMessage="Internal server error"
				/>
			</div>
		);
	}
}
