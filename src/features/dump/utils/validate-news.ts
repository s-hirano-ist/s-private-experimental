import "server-only";
import { FORM_ERROR_MESSAGES } from "@/constants";
import { newsSchema } from "@/features/dump/schemas/news-schema";

export function validateNews(formData: FormData) {
	const newsValidatedFields = newsSchema.safeParse({
		categoryId: Number(formData.get("category")),
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!newsValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);

	return newsValidatedFields.data;
}
