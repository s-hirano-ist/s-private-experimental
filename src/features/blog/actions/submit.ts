"use server";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { createCategory } from "@/apis/prisma/category";
import { createNewsDetail } from "@/apis/prisma/news-detail";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants";
import type { QueuedContent } from "../stores/queued-contents-context";
import { validateNewsDetail } from "../utils/validate";
import { validateCategory } from "../utils/validate";

type SubmitBlogState = {
	success: boolean | undefined;
	message: string;
	data?: QueuedContent;
};

export async function submitBlog(formData: FormData): Promise<SubmitBlogState> {
	try {
		const newCategory = validateCategory(formData);
		if (newCategory !== null) {
			const category = await createCategory(newCategory);
			await sendLineNotifyMessage(
				`Category: ${category.category}の登録ができました。`,
			);
			formData.set("category", String(category.id));
		}

		const newsDetailValidatedFields = validateNewsDetail(formData);
		const newNewsDetail = await createNewsDetail(newsDetailValidatedFields);
		await sendLineNotifyMessage(
			`NewsDetail: \n ${newNewsDetail.title} \n ${newNewsDetail.quote} \n ${newNewsDetail.url} の登録ができました。`,
		);

		return {
			success: true,
			message: SUCCESS_MESSAGES.SUCCESS,
			data: {
				id: newNewsDetail.id,
				title: newsDetailValidatedFields.data.title,
				quote: newsDetailValidatedFields.data.quote,
				url: newsDetailValidatedFields.data.url,
				category: newNewsDetail.category.category,
			},
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
		await sendLineNotifyMessage(ERROR_MESSAGES.UNEXPECTED);
		return {
			success: false,
			message: ERROR_MESSAGES.UNEXPECTED,
		};
	}
}
