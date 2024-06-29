"use server";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { revertNewsDetailStatus } from "@/apis/prisma/change-status";
import { ERROR_MESSAGES } from "@/constants";
import { formatChangeStatusMessage } from "@/lib/format-for-line";

export async function revertStatus(): Promise<ServerAction> {
	try {
		const message = formatChangeStatusMessage(await revertNewsDetailStatus());
		await sendLineNotifyMessage(message);
		return { success: true, message };
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
