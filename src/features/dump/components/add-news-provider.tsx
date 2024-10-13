import { getSelfCategories } from "@/apis/prisma/fetch-category";
import { AddNewsForm } from "@/features/dump/components/add-news-form";

export async function AddNewsProvider() {
	try {
		const categories = await getSelfCategories();

		return <AddNewsForm categories={categories} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
