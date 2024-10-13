import { getSelfCategories } from "@/apis/prisma/fetch-category";
import { NewsAddForm } from "@/features/dump/components/news-add-form";

export async function NewsAddProvider() {
	try {
		const categories = await getSelfCategories();

		return <NewsAddForm categories={categories} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
