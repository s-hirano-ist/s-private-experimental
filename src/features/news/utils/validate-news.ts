import "server-only";
import { InvalidFormatError } from "@/error-classes";
import { newsSchema } from "@/features/news/schemas/news-schema";

export function validateNews(formData: FormData) {
	const newsValidatedFields = newsSchema.safeParse({
		categoryId: Number(formData.get("category")),
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!newsValidatedFields.success) throw new InvalidFormatError();

	return newsValidatedFields.data;
}
