"use server";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { createCategory } from "@/apis/prisma/category";
import { createNewsDetail } from "@/apis/prisma/news-detail";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import {
	formatCreateCategoryMessage,
	formatCreateNewsDetailMessage,
} from "@/lib/format-for-line";
import type { NewsDetailContext } from "../stores/news-detail-context";
import { validateNewsDetail } from "../utils/validate";
import { validateCategory } from "../utils/validate";

type AddNewsDetailState = ServerAction & {
	data?: NewsDetailContext;
};

export async function addNewsDetail(
	formData: FormData,
): Promise<AddNewsDetailState> {
	try {
		const newCategory = validateCategory(formData);
		if (newCategory !== null) {
			const category = await createCategory(newCategory);
			await sendLineNotifyMessage(
				formatCreateCategoryMessage(category.category),
			);
			formData.set("category", String(category.id));
		}

		const newsDetailValidatedFields = validateNewsDetail(formData);
		const newNewsDetail = await createNewsDetail(newsDetailValidatedFields);
		await sendLineNotifyMessage(
			formatCreateNewsDetailMessage(
				newNewsDetail.title,
				newNewsDetail.quote ?? "",
				newNewsDetail.url,
			),
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
