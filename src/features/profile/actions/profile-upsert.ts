"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/fetch-message";
import { upsertProfile } from "@/apis/prisma/fetch-profile";
import { SUCCESS_MESSAGES } from "@/constants";
import { formatErrorForClient } from "@/error";
import type { ProfileSchema } from "@/features/profile/schemas/profile-schema";
import type { ServerAction } from "@/types";
import { formatUpsertProfileMessage } from "@/utils/format-for-line";

export async function profileUpsert(
	values: ProfileSchema,
): Promise<ServerAction<undefined>> {
	try {
		await upsertProfile(values);
		await sendLineNotifyMessage(formatUpsertProfileMessage(values));

		return {
			success: true,
			message: SUCCESS_MESSAGES.PROFILE_UPSERTED,
			data: undefined,
		};
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
