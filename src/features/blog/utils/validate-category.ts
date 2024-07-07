import { FORM_ERROR_MESSAGES } from "@/constants";
import { categorySchema } from "../schemas/category-schema";

export function validateCategory(formData: FormData) {
	const categoryValidatedFields = categorySchema.safeParse({
		newCategory: formData.get("new_category"),
	});
	if (!categoryValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);
	return categoryValidatedFields.data.newCategory;
}
