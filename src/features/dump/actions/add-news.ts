"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { createCategory } from "@/apis/prisma/fetch-category";
import { postNews } from "@/apis/prisma/fetch-news";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import { checkPostPermission } from "@/features/auth/lib/role";
import { getUserId } from "@/features/auth/lib/user-id";
import type { NewsContext } from "@/features/dump/stores/news-context";
import { validateCategory } from "@/features/dump/utils/validate-category";
import { validateNews } from "@/features/dump/utils/validate-news";
import {
	formatCreateCategoryMessage,
	formatCreateNewsMessage,
} from "@/utils/format-for-line";
import type { ActionState } from "./type";

export async function addNews(
	formData: FormData,
): Promise<ActionState<NewsContext>> {
	try {
		const hasPostPermission = await checkPostPermission();
		if (!hasPostPermission) throw new Error(ERROR_MESSAGES.UNAUTHORIZED);

		const userId = await getUserId();

		const hasCategory = formData.get("new_category") !== null;

		if (hasCategory) {
			const category = await createCategory(userId, validateCategory(formData));
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
				category: postedNews.category.name,
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
