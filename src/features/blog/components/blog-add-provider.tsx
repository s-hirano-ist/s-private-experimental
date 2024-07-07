import { getCategories } from "@/apis/prisma/fetch-category";
import { BlogAddForm } from "@/features/blog/components/blog-add-form";

export async function BlogAddProvider() {
	try {
		const categories = await getCategories();
		return <BlogAddForm categories={categories} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
