import { FORM_ERROR_MESSAGES } from "@/constants";
import { contentsSchema } from "@/features/dump/schemas/contents-schema";

export function validateContents(formData: FormData) {
	const contentsValidatedFields = contentsSchema.safeParse({
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!contentsValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);

	return contentsValidatedFields.data;
}
