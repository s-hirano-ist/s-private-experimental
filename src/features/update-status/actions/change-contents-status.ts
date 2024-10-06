"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import {
	revertContentsStatus,
	updateContentsStatus,
} from "@/apis/prisma/fetch-contents";
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
			return await updateContentsStatus(userId);
		case "REVERT":
			return await revertContentsStatus(userId);
		default:
			throw new UnexpectedError();
	}
};

type ToastMessage = string;

export async function changeContentsStatus(
	changeType: UpdateOrRevert,
): Promise<ServerAction<ToastMessage>> {
	try {
		const userId = await getUserId();
		const hasUpdateStatusPermission = await checkUpdateStatusPermission();
		if (!hasUpdateStatusPermission) throw new NotAllowedError();

		const data = formatChangeStatusMessage(
			await handleStatusChange(userId, changeType),
			"CONTENTS",
		);
		await sendLineNotifyMessage(data);
		return { success: true, message: SUCCESS_MESSAGES.UPDATE, data };
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
