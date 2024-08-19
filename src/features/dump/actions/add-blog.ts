"use server";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { createBlog } from "@/apis/prisma/fetch-blog";
import { createCategory } from "@/apis/prisma/fetch-category";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import { auth } from "@/features/auth/lib/auth";
import {
	formatCreateCategoryMessage,
	formatCreateContentMessage,
} from "@/lib/format-for-line";
import type { BlogContext } from "../stores/blog-context";
import { validateBlog } from "../utils/validate-blog";
import { validateCategory } from "../utils/validate-category";

type AddBlogState =
	| (ServerAction & { success: true; data: BlogContext })
	| (ServerAction & { success: false });

export async function addBlog(formData: FormData): Promise<AddBlogState> {
	try {
		const authorized = await auth();
		if (!authorized) throw new Error("Unauthorized");

		const newCategory = validateCategory(formData);
		if (newCategory !== null) {
			const category = await createCategory(newCategory);
			await sendLineNotifyMessage(
				formatCreateCategoryMessage(category.name, "BLOG"),
			);
			formData.set("category", String(category.id));
		}

		const blogValidatedFields = validateBlog(formData);
		const newBlog = await createBlog(blogValidatedFields);
		await sendLineNotifyMessage(
			formatCreateContentMessage(
				newBlog.title,
				newBlog.quote ?? "",
				newBlog.url,
				"BLOG",
				newBlog.category.name,
			),
		);

		return {
			success: true,
			message: SUCCESS_MESSAGES.SUCCESS,
			data: {
				id: newBlog.id,
				title: blogValidatedFields.data.title,
				quote: blogValidatedFields.data.quote,
				url: blogValidatedFields.data.url,
				category: newBlog.category.name,
			},
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			await sendLineNotifyMessage(error.message);
			return {
				success: false,
				message: error.message,
			};
		}
		console.error("Unexpected error:", error);
		await sendLineNotifyMessage(ERROR_MESSAGES.UNEXPECTED);
		return {
			success: false,
			message: ERROR_MESSAGES.UNEXPECTED,
		};
	}
}
