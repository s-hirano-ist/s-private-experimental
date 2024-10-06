"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { revertNewsStatus, updateNewsStatus } from "@/apis/prisma/fetch-news";
import { SUCCESS_MESSAGES } from "@/constants";
import {
	NotAllowedError,
	UnexpectedError,
	formatErrorForClient,
} from "@/error";
import { checkUpdateStatusPermission } from "@/features/auth/lib/role";
import { getUserId } from "@/features/auth/lib/user-id";
import type { UpdateOrRevert } from "@/features/update-status/types";
import type { ServerAction } from "@/types";
import { formatChangeStatusMessage } from "@/utils/format-for-line";

const handleStatusChange = async (
	userId: string,
	changeType: UpdateOrRevert,
) => {
	switch (changeType) {
		case "UPDATE":
			return await updateNewsStatus(userId);
		case "REVERT":
			return await revertNewsStatus(userId);
		default:
			throw new UnexpectedError();
	}
};

type ToastMessage = string;

export async function changeNewsStatus(
	updateOrRevert: UpdateOrRevert,
): Promise<ServerAction<ToastMessage>> {
	try {
		const userId = await getUserId();
		const hasUpdateStatusPermission = await checkUpdateStatusPermission();
		if (!hasUpdateStatusPermission) throw new NotAllowedError();

		const data = formatChangeStatusMessage(
			await handleStatusChange(userId, updateOrRevert),
			"NEWS",
		);
		await sendLineNotifyMessage(data);
		return { success: true, message: SUCCESS_MESSAGES.UPDATE, data };
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
