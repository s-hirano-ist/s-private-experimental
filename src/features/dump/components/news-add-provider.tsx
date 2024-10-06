import { getCategories } from "@/apis/prisma/fetch-category";
import { getUserId } from "@/features/auth/lib/user-id";
import { NewsAddForm } from "@/features/dump/components/news-add-form";

export async function NewsAddProvider() {
	try {
		const userId = await getUserId();
		const categories = await getCategories(userId);

		return <NewsAddForm categories={categories} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
