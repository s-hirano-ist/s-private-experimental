"use server";
import prisma from "@/server/db";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";
import { categorySchema, newsDetailSchema } from "../schemas/blog-schema";
import type { QueuedContent } from "../stores/queued-contents-context";

type SubmitBlogState = {
	success: boolean | undefined;
	message: string;
	data?: QueuedContent;
};

function validateCategory(formData: FormData) {
	const categoryValidatedFields = categorySchema.safeParse({
		newCategory: formData.get("new_category"),
	});
	if (!categoryValidatedFields.success)
		throw new Error(ERROR_MESSAGES.INVALID_FORMAT);
	return categoryValidatedFields.data.newCategory;
}

function validateNewsDetail(formData: FormData) {
	const newsDetailValidatedFields = newsDetailSchema.safeParse({
		categoryId: Number(formData.get("category")),
		title: formData.get("title"),
		quote: formData.get("quote"),
		url: formData.get("url"),
	});
	if (!newsDetailValidatedFields.success)
		throw new Error(ERROR_MESSAGES.INVALID_FORMAT);

	return newsDetailValidatedFields;
}

export async function submitBlog(formData: FormData): Promise<SubmitBlogState> {
	try {
		const newCategory = validateCategory(formData);
		if (newCategory !== null) {
			const category = await prisma.category.create({
				data: { category: newCategory },
			});
			formData.set("category", String(category.id));
		}

		const newsDetailValidatedFields = validateNewsDetail(formData);
		const createNewsDetail = await prisma.newsDetail.create({
			data: newsDetailValidatedFields.data,
			include: {
				category: true,
			},
		});
		const category = createNewsDetail.category?.category;
		if (!category) throw new Error(ERROR_MESSAGES.UNEXPECTED);

		const data = {
			id: createNewsDetail.id,
			title: newsDetailValidatedFields.data.title,
			quote: newsDetailValidatedFields.data.quote,
			url: newsDetailValidatedFields.data.url,
			category,
		};

		console.log("Successfully added:", newsDetailValidatedFields.data);

		return {
			success: true,
			message: SUCCESS_MESSAGES.SUCCESS,
			data,
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			return {
				success: false,
				message: error.message,
			};
		}
		console.error("Unexpected error:", error);
		return {
			success: false,
			message: ERROR_MESSAGES.UNEXPECTED,
		};
	}
}
