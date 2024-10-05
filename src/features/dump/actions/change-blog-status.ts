"use server";
import "server-only";
import { LineNotifyError } from "@/apis/line-notify/error";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { revertNewsStatus, updateNewsStatus } from "@/apis/prisma/fetch-news";
import { ERROR_MESSAGES } from "@/constants";
import { auth } from "@/features/auth/lib/auth";
import { formatChangeStatusMessage } from "@/features/dump/utils/format-for-line";
import type { ServerAction } from "@/types/server-action";
import { Prisma } from "@prisma/client";

type Change = "UPDATE" | "REVERT";

const handleStatusChange = async (changeType: Change) => {
	switch (changeType) {
		case "UPDATE":
			return await updateNewsStatus();
		case "REVERT":
			return await revertNewsStatus();
		default:
			throw new Error(ERROR_MESSAGES.UNEXPECTED);
	}
};

export async function changeBlogStatus(
	changeType: Change,
): Promise<ServerAction> {
	try {
		const authorized = await auth();
		if (!authorized) throw new Error("Unauthorized");

		const message = formatChangeStatusMessage(
			await handleStatusChange(changeType),
			"BLOG",
		);
		await sendLineNotifyMessage(message);
		return { success: true, message };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			await sendLineNotifyMessage(error.message);
			return {
				success: false,
				message: ERROR_MESSAGES.PRISMA_WRITE,
			};
		}
		if (error instanceof LineNotifyError) {
			// MEMO: unhandled防止 await sendLineNotifyMessage(error.message);
			return {
				success: false,
				message: ERROR_MESSAGES.LINE_SEND,
			};
		}
		if (error instanceof Error) {
			await sendLineNotifyMessage(error.message);
		} else {
			await sendLineNotifyMessage(ERROR_MESSAGES.UNEXPECTED);
		}
		return {
			success: false,
			message: ERROR_MESSAGES.UNEXPECTED,
		};
	}
}
