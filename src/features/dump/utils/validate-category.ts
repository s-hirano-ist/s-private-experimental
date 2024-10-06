import "server-only";
import { InvalidFormatError } from "@/error";
import { categorySchema } from "@/features/dump/schemas/category-schema";

export function validateCategory(formData: FormData) {
	const categoryValidatedFields = categorySchema.safeParse({
		name: formData.get("new_category"),
	});
	if (!categoryValidatedFields.success) throw new InvalidFormatError();

	return categoryValidatedFields.data;
}
