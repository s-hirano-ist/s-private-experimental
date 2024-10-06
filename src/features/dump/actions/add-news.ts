"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { createCategory } from "@/apis/prisma/fetch-category";
import { postNews } from "@/apis/prisma/fetch-news";
import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError, formatErrorForClient } from "@/error";
import { checkPostPermission } from "@/features/auth/lib/role";
import { getUserId } from "@/features/auth/lib/user-id";
import type { NewsContext } from "@/features/dump/stores/news-context";
import { validateCategory } from "@/features/dump/utils/validate-category";
import { validateNews } from "@/features/dump/utils/validate-news";
import type { ServerAction } from "@/types";
import {
	formatCreateCategoryMessage,
	formatCreateNewsMessage,
} from "@/utils/format-for-line";

export async function addNews(
	formData: FormData,
): Promise<ServerAction<NewsContext>> {
	try {
		const hasPostPermission = await checkPostPermission();
		if (!hasPostPermission) throw new NotAllowedError();

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
			message: SUCCESS_MESSAGES.INSERTED,
			data: {
				...postedNews,
				category: postedNews.category.name,
			},
		};
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
