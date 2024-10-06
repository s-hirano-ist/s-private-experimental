"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { postContents } from "@/apis/prisma/fetch-contents";
import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError, formatErrorForClient } from "@/error";
import { checkPostPermission } from "@/features/auth/lib/role";
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

		const postedContents = await postContents(validateContents(formData));
		await sendLineNotifyMessage(formatCreateContentsMessage(postedContents));

		return {
			success: true,
			message: SUCCESS_MESSAGES.INSERTED,
			data: postedContents,
		};
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
