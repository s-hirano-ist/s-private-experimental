import { FORM_ERROR_MESSAGES } from "@/constants";
import { blogSchema } from "../schemas/blog-schema";

export function validateBlog(formData: FormData) {
	const blogValidatedFields = blogSchema.safeParse({
		categoryId: Number(formData.get("category")),
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!blogValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);

	return blogValidatedFields;
}
