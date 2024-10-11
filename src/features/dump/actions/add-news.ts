"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { createCategory } from "@/apis/prisma/fetch-category";
import { createNews } from "@/apis/prisma/fetch-news";
import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError, formatErrorForClient } from "@/error";
import { checkPostPermission } from "@/features/auth/utils/role";
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

		const hasCategory = formData.get("new_category") !== null;

		if (hasCategory) {
			const category = await createCategory(validateCategory(formData));
			await sendLineNotifyMessage(
				formatCreateCategoryMessage(category.name, "NEWS"),
			);
			formData.set("category", String(category.id));
		}

		const createdNews = await createNews(validateNews(formData));
		await sendLineNotifyMessage(formatCreateNewsMessage(createdNews));

		return {
			success: true,
			message: SUCCESS_MESSAGES.INSERTED,
			data: {
				...createdNews,
				category: createdNews.Category.name,
			},
		};
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
