"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { getUserId } from "@/features/auth/utils/get-session";
import { loggerInfo } from "@/pino";
import prisma from "@/prisma";
import type { ServerAction } from "@/types";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatUpdateScopeMessage } from "@/utils/format-for-line";

export async function changeScope(
	checked: boolean,
): Promise<ServerAction<undefined>> {
	try {
		const userId = await getUserId();

		const scope = checked ? "PUBLIC" : "PRIVATE";
		await prisma.users.update({
			where: { id: userId },
			data: { scope },
		});
		const message = formatUpdateScopeMessage(scope);
		loggerInfo(message, {
			caller: "changeScope",
			status: 200,
		});
		await sendLineNotifyMessage(message);

		return {
			success: true,
			message: SUCCESS_MESSAGES.SCOPE_UPDATED,
			data: undefined,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
