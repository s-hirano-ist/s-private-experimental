import { FORM_ERROR_MESSAGES } from "@/constants";
import { categorySchema } from "@/features/dump/schemas/category-schema";

export function validateCategory(formData: FormData) {
	const categoryValidatedFields = categorySchema.safeParse({
		name: formData.get("new_category"),
	});
	if (!categoryValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);

	return categoryValidatedFields.data;
}
