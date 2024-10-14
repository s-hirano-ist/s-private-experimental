import "server-only";
import { InvalidFormatError } from "@/error-classes";
import { contentsSchema } from "@/features/dump/schemas/contents-schema";

export function validateContents(formData: FormData) {
	const contentsValidatedFields = contentsSchema.safeParse({
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!contentsValidatedFields.success) throw new InvalidFormatError();

	return contentsValidatedFields.data;
}
