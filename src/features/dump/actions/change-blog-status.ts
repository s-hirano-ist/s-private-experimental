"use server";
import { LineNotifyError } from "@/apis/line-notify/error";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import {
	revertBlogStatus,
	updateBlogStatus,
} from "@/apis/prisma/change-blog-status";
import { ERROR_MESSAGES } from "@/constants";
import { auth } from "@/features/auth/lib/auth";
import { formatChangeStatusMessage } from "@/lib/format-for-line";
import type { ServerAction } from "@/types/server-action";
import { Prisma } from "@prisma/client";

type Change = "UPDATE" | "REVERT";

const handleStatusChange = async (changeType: Change) => {
	switch (changeType) {
		case "UPDATE":
			return await updateBlogStatus();
		case "REVERT":
			return await revertBlogStatus();
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
