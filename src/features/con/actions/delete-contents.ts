"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { hasUpdateStatusPermissionOrThrow } from "@/features/auth/utils/get-session";
import { loggerInfo } from "@/pino";
import prisma from "@/prisma";
import type { ServerAction } from "@/types";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatDeleteMessage } from "@/utils/format-for-line";
import { revalidatePath } from "next/cache";

type ToastMessage = string;

export async function deleteContents(
	id: number,
): Promise<ServerAction<ToastMessage>> {
	try {
		await hasUpdateStatusPermissionOrThrow();

		await prisma.contents.update({
			where: { id },
			data: { status: "EXPORTED" },
		});

		const message = formatDeleteMessage(id, "CONTENTS");
		loggerInfo(message, {
			caller: "deleteContents",
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
