"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { updateScope } from "@/apis/prisma/fetch-user";
import { SUCCESS_MESSAGES } from "@/constants";
import { formatErrorForClient } from "@/error";
import type { ServerAction } from "@/types";
import { formatUpdateScopeMessage } from "@/utils/format-for-line";

export async function toggleScope(
	checked: boolean,
): Promise<ServerAction<undefined>> {
	try {
		const scope = checked ? "PUBLIC" : "PRIVATE";
		await updateScope(scope);
		await sendLineNotifyMessage(formatUpdateScopeMessage(scope));

		return {
			success: true,
			message: SUCCESS_MESSAGES.SCOPE_UPDATED,
			data: undefined,
		};
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
