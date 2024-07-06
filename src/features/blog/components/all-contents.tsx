import { getAllBlog } from "@/apis/prisma/fetch-blog";
import ErrorView from "@/components/error-view";
import { AllTable } from "./all-table";

export async function AllContents() {
	try {
		const blog = await getAllBlog();

		return (
			<AllTable
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
