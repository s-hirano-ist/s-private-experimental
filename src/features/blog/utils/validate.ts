import { FORM_ERROR_MESSAGES } from "@/constants";
import { categorySchema } from "../schemas/category-schema";
import { mypageSchema } from "../schemas/mypage-schema";
import { blogSchema } from "../schemas/blog-schema";

export function validateCategory(formData: FormData) {
	const categoryValidatedFields = categorySchema.safeParse({
		newCategory: formData.get("new_category"),
	});
	if (!categoryValidatedFields.success)
		throw new Error(FORM_ERROR_MESSAGES.INVALID_FORMAT);
	return categoryValidatedFields.data.newCategory;
}

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
