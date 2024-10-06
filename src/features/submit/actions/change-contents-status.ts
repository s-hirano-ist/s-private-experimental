"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import {
	revertContentsStatus,
	updateContentsStatus,
} from "@/apis/prisma/fetch-contents";
import { ERROR_MESSAGES } from "@/constants";
import { LineNotifyError } from "@/error";
import { checkUpdateStatusPermission } from "@/features/auth/lib/role";
import { getUserId } from "@/features/auth/lib/user-id";
import type { Change } from "@/features/submit/types";
import type { ServerAction } from "@/types";
import { formatChangeStatusMessage } from "@/utils/format-for-line";
import { Prisma } from "@prisma/client";

const handleStatusChange = async (userId: string, changeType: Change) => {
	switch (changeType) {
		case "UPDATE":
			return await updateContentsStatus(userId);
		case "REVERT":
			return await revertContentsStatus(userId);
		default:
			throw new Error(ERROR_MESSAGES.UNEXPECTED);
	}
};

export async function changeContentsStatus(
	changeType: Change,
): Promise<ServerAction> {
	try {
		const userId = await getUserId();
		const hasUpdateStatusPermission = await checkUpdateStatusPermission();
		if (!hasUpdateStatusPermission)
			throw new Error(ERROR_MESSAGES.UNAUTHORIZED);

		const message = formatChangeStatusMessage(
			await handleStatusChange(userId, changeType),
			"CONTENTS",
		);
		await sendLineNotifyMessage(message);
		return { success: true, message };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error(error.message);
			await sendLineNotifyMessage(error.message);
			return {
				success: false,
				message: ERROR_MESSAGES.PRISMA_WRITE,
			};
		}
		if (error instanceof LineNotifyError) {
			console.error(error.message);
			// MEMO: unhandled防止 await sendLineNotifyMessage(error.message);
			return {
				success: false,
				message: ERROR_MESSAGES.LINE_SEND,
			};
		}
		if (error instanceof Error) {
			console.error("Unexpected error:", error.message);
			await sendLineNotifyMessage(error.message);
		} else {
			console.error("Unexpected error:", error);
			await sendLineNotifyMessage(ERROR_MESSAGES.UNEXPECTED);
		}
		return {
			success: false,
			message: ERROR_MESSAGES.UNEXPECTED,
		};
	}
}
