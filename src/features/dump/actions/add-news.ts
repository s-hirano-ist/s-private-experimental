"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { createCategory } from "@/apis/prisma/fetch-category";
import { postNews } from "@/apis/prisma/fetch-news";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import { auth } from "@/features/auth/lib/auth";
import type { NewsContext } from "@/features/dump/stores/news-context";
import {
	formatCreateCategoryMessage,
	formatCreateNewsMessage,
} from "@/features/dump/utils/format-for-line";
import { validateCategory } from "@/features/dump/utils/validate-category";
import { validateNews } from "@/features/dump/utils/validate-news";
import type { ActionState } from "./type";

export async function addNews(
	formData: FormData,
): Promise<ActionState<NewsContext>> {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!session || !userId) throw new Error("Unauthorized");

		const categoryName = validateCategory(formData);

		if (categoryName.name !== null) {
			const category = await createCategory(userId, categoryName);
			await sendLineNotifyMessage(
				formatCreateCategoryMessage(category.name, "NEWS"),
			);
			formData.set("category", String(category.id));
		}

		const postedNews = await postNews(userId, validateNews(formData));
		await sendLineNotifyMessage(formatCreateNewsMessage(postedNews));

		return {
			success: true,
			message: SUCCESS_MESSAGES.INSERT,
			data: {
				...postedNews,
				category: postedNews.categories.name,
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
