"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/fetch-message";
import { updateSelfScope } from "@/apis/prisma/fetch-user";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import type { ServerAction } from "@/types";
import { formatUpdateScopeMessage } from "@/utils/format-for-line";

export async function changeScope(
	checked: boolean,
): Promise<ServerAction<undefined>> {
	try {
		const scope = checked ? "PUBLIC" : "PRIVATE";
		await updateSelfScope(scope);
		await sendLineNotifyMessage(formatUpdateScopeMessage(scope));

		return {
			success: true,
			message: SUCCESS_MESSAGES.SCOPE_UPDATED,
			data: undefined,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
