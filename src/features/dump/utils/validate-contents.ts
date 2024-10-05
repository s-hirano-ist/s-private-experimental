import { FORM_ERROR_MESSAGES } from "@/constants";
import { contentsSchema } from "@/features/dump/schemas/contents-schema";

export function validateContents(formData: FormData) {
	const mypageValidatedFields = contentsSchema.safeParse({
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!mypageValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);

	return mypageValidatedFields.data;
}
