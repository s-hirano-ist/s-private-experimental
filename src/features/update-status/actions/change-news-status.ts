"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/fetch-message";
import {
	revertSelfNewsStatus,
	updateSelfNewsStatus,
} from "@/apis/prisma/fetch-news";
import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError, UnexpectedError } from "@/error-classes";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { checkUpdateStatusPermission } from "@/features/auth/utils/role";
import type { UpdateOrRevert } from "@/features/update-status/types";
import type { ServerAction } from "@/types";
import { formatChangeStatusMessage } from "@/utils/format-for-line";

const handleStatusChange = async (changeType: UpdateOrRevert) => {
	switch (changeType) {
		case "UPDATE":
			return await updateSelfNewsStatus();
		case "REVERT":
			return await revertSelfNewsStatus();
		default:
			throw new UnexpectedError();
	}
};

type ToastMessage = string;

export async function changeNewsStatus(
	updateOrRevert: UpdateOrRevert,
): Promise<ServerAction<ToastMessage>> {
	try {
		const hasUpdateStatusPermission = await checkUpdateStatusPermission();
		if (!hasUpdateStatusPermission) throw new NotAllowedError();

		const data = formatChangeStatusMessage(
			await handleStatusChange(updateOrRevert),
			"NEWS",
		);
		await sendLineNotifyMessage(data);
		return { success: true, message: SUCCESS_MESSAGES.UPDATE, data };
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
