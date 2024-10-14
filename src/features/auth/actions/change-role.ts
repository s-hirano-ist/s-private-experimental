"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { checkSelfAdminRoleOrThrow } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import type { ServerAction } from "@/types";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatUpdateRoleMessage } from "@/utils/format-for-line";
import type { Role } from "@prisma/client";

export async function changeRole(
	userId: string,
	role: Role,
): Promise<ServerAction<undefined>> {
	try {
		await checkSelfAdminRoleOrThrow();

		await prisma.users.update({
			where: { id: userId },
			data: { role },
		});

		await sendLineNotifyMessage(formatUpdateRoleMessage(role));

		return {
			success: true,
			message: SUCCESS_MESSAGES.ROLE_UPDATED,
			data: undefined,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
