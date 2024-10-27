"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { getUserId } from "@/features/auth/utils/get-session";
import type { ProfileSchema } from "@/features/profile/schemas/profile-schema";
import { loggerInfo } from "@/pino";
import prisma from "@/prisma";
import type { ServerAction } from "@/types";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatUpsertProfileMessage } from "@/utils/format-for-line";

export async function changeProfile(
	data: ProfileSchema,
): Promise<ServerAction<undefined>> {
	try {
		const userId = await getUserId();

		await prisma.profiles.upsert({
			where: { userId },
			update: data,
			create: { userId, ...data },
		});

		const message = formatUpsertProfileMessage(data);
		loggerInfo(message, {
			caller: "changeProfile",
			status: 200,
		});
		await sendLineNotifyMessage(message);

		return {
			success: true,
			message: SUCCESS_MESSAGES.PROFILE_UPSERTED,
			data: undefined,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
