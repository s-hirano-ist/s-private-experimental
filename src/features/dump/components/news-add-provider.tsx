import { getCategories } from "@/apis/prisma/fetch-category";
import { NewsAddForm } from "@/features/dump/components/news-add-form";

export async function NewsAddProvider() {
	try {
		const categories = await getCategories();

		return <NewsAddForm categories={categories} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
