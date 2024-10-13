"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/fetch-message";
import { upsertSelfProfile } from "@/apis/prisma/fetch-profile";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error";
import type { ProfileSchema } from "@/features/profile/schemas/profile-schema";
import type { ServerAction } from "@/types";
import { formatUpsertProfileMessage } from "@/utils/format-for-line";

export async function changeProfile(
	values: ProfileSchema,
): Promise<ServerAction<undefined>> {
	try {
		await upsertSelfProfile(values);
		await sendLineNotifyMessage(formatUpsertProfileMessage(values));

		return {
			success: true,
			message: SUCCESS_MESSAGES.PROFILE_UPSERTED,
			data: undefined,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
