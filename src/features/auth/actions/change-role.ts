"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/fetch-message";
import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError } from "@/error-classes";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { getSelfRole } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import type { ServerAction } from "@/types";
import { formatUpdateRoleMessage } from "@/utils/format-for-line";
import type { Role } from "@prisma/client";

export async function changeRole(
	userId: string,
	role: Role,
): Promise<ServerAction<undefined>> {
	try {
		const selfRole = await getSelfRole();
		if (selfRole !== "ADMIN") throw new NotAllowedError();

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
