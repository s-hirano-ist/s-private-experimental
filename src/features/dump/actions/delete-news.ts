"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import {
	getUserId,
	hasUpdateStatusPermissionOrThrow,
} from "@/features/auth/utils/get-session";
import { loggerInfo } from "@/pino";
import prisma from "@/prisma";
import type { ServerAction } from "@/types";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatDeleteMessage } from "@/utils/format-for-line";
import { revalidatePath } from "next/cache";

type ToastMessage = string;

export async function deleteNews(
	id: number,
): Promise<ServerAction<ToastMessage>> {
	try {
		await hasUpdateStatusPermissionOrThrow();

		const userId = await getUserId();

		await prisma.news.update({
			where: { id },
			data: { status: "EXPORTED" },
		});

		const message = formatDeleteMessage(id, "NEWS");
		loggerInfo(message, {
			caller: "deleteNews",
			status: 200,
		});
		await sendLineNotifyMessage(message);
		revalidatePath("/admin");
		revalidatePath("/");
		return { success: true, message: SUCCESS_MESSAGES.UPDATE, data: message };
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
