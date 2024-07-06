"use server";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import {
	revertMypageStatus,
	updateMypageStatus,
} from "@/apis/prisma/change-mypage-status";
import { ERROR_MESSAGES } from "@/constants";
import { formatChangeStatusMessage } from "@/lib/format-for-line";
import prisma from "@/server/db";
import { Prisma } from "@prisma/client";

type Change = "UPDATE" | "REVERT";

const handleStatusChange = async (changeType: Change) => {
	switch (changeType) {
		case "UPDATE":
			return await updateMypageStatus();
		case "REVERT":
			return await revertMypageStatus();
		default:
			throw new Error(ERROR_MESSAGES.UNEXPECTED);
	}
};

export async function changeMypageStatus(
	changeType: Change,
): Promise<ServerAction> {
	try {
		const message = formatChangeStatusMessage(
			await handleStatusChange(changeType),
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
