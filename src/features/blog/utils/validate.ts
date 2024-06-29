import { FORM_ERROR_MESSAGES } from "@/constants";
import { categorySchema } from "../schemas/category-schema";
import { newsDetailSchema } from "../schemas/news-detail-schema";

export function validateCategory(formData: FormData) {
	const categoryValidatedFields = categorySchema.safeParse({
		newCategory: formData.get("new_category"),
	});
	if (!categoryValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);
	return categoryValidatedFields.data.newCategory;
}

export function validateNewsDetail(formData: FormData) {
	const newsDetailValidatedFields = newsDetailSchema.safeParse({
		categoryId: Number(formData.get("category")),
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!newsDetailValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);

	return newsDetailValidatedFields;
}
