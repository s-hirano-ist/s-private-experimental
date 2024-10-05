import { getCategories } from "@/apis/prisma/fetch-category";
import { auth } from "@/features/auth/lib/auth";
import { NewsAddForm } from "@/features/dump/components/news-add-form";

export async function NewsAddProvider() {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!session || !userId) throw new Error("Unauthorized");

		const categories = await getCategories(userId);

		return <NewsAddForm categories={categories} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
