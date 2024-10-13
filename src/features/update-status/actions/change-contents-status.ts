"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/fetch-message";
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
import { checkUpdateStatusPermission } from "@/features/auth/utils/role";
import type { UpdateOrRevert } from "@/features/update-status/types";
import type { ServerAction } from "@/types";
import { formatChangeStatusMessage } from "@/utils/format-for-line";

const handleStatusChange = async (changeType: UpdateOrRevert) => {
	switch (changeType) {
		case "UPDATE":
			return await updateContentsStatus();
		case "REVERT":
			return await revertContentsStatus();
		default:
			throw new UnexpectedError();
	}
};

type ToastMessage = string;

export async function changeContentsStatus(
	changeType: UpdateOrRevert,
): Promise<ServerAction<ToastMessage>> {
	try {
		const hasUpdateStatusPermission = await checkUpdateStatusPermission();
		if (!hasUpdateStatusPermission) throw new NotAllowedError();

		const data = formatChangeStatusMessage(
			await handleStatusChange(changeType),
			"CONTENTS",
		);
		await sendLineNotifyMessage(data);
		return { success: true, message: SUCCESS_MESSAGES.UPDATE, data };
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
