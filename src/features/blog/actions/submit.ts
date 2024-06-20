"use server";
import prisma from "@/server/db";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";
import { blogSchema } from "../schemas/blog-schema";
import type { QueuedContent } from "../stores/queued-contents-context";

type SubmitBlogState = {
	success: boolean | undefined;
	message: string;
	data?: QueuedContent;
};

export async function submitBlog(formData: FormData): Promise<SubmitBlogState> {
	try {
		const validatedFields = blogSchema.safeParse({
			categoryId: Number(formData.get("category")),
			title: formData.get("title"),
			quote: formData.get("quote"),
			url: formData.get("url"),
		});

		if (!validatedFields.success) {
			console.error("Invalid format.");
			return {
				success: false,
				message: ERROR_MESSAGES.INVALID_FORMAT,
			};
		}
		const createNewsDetail = await prisma.newsDetail.create({
			data: validatedFields.data,
			include: {
				category: true,
			},
		});
		const category = createNewsDetail.category?.category;
		if (!category) throw new Error("Category undefined error.");

		const data = {
			id: createNewsDetail.id,
			title: validatedFields.data.title,
			quote: validatedFields.data.quote,
			url: validatedFields.data.url,
			category,
		};

		console.log("Successfully added:", validatedFields.data);

		return {
			success: true,
			message: SUCCESS_MESSAGES.SUCCESS,
			data,
		};
	} catch (error) {
		console.error("Unexpected error:", error);
		return {
			success: false,
			message: ERROR_MESSAGES.UNEXPECTED,
		};
	}
}
