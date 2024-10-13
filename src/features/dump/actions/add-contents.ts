"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/fetch-message";
import { createSelfContents } from "@/apis/prisma/fetch-contents";
import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError, wrapServerSideErrorForClient } from "@/error";
import { checkPostPermission } from "@/features/auth/utils/role";
import type { ContentsContext } from "@/features/dump/stores/contents-context";
import { validateContents } from "@/features/dump/utils/validate-contents";
import type { ServerAction } from "@/types";
import { formatCreateContentsMessage } from "@/utils/format-for-line";

export async function addContents(
	formData: FormData,
): Promise<ServerAction<ContentsContext>> {
	try {
		const hasPostPermission = await checkPostPermission();
		if (!hasPostPermission) throw new NotAllowedError();

		const createdContents = await createSelfContents(
			validateContents(formData),
		);
		await sendLineNotifyMessage(formatCreateContentsMessage(createdContents));

		return {
			success: true,
			message: SUCCESS_MESSAGES.INSERTED,
			data: createdContents,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
