import { FORM_ERROR_MESSAGES } from "@/constants";
import { mypageSchema } from "@/features/dump/schemas/mypage-schema";

export function validateMypage(formData: FormData) {
	const mypageValidatedFields = mypageSchema.safeParse({
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!mypageValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);

	return mypageValidatedFields;
}
