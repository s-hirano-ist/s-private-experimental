"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { postContents } from "@/apis/prisma/fetch-contents";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import { auth } from "@/features/auth/lib/auth";
import type { ContentsContext } from "@/features/dump/stores/contents-context";
import { validateContents } from "@/features/dump/utils/validate-contents";
import { formatCreateContentsMessage } from "@/utils/format-for-line";
import type { ActionState } from "./type";

export async function addContents(
	formData: FormData,
): Promise<ActionState<ContentsContext>> {
	try {
		const session = await auth();
		const userId = session?.user?.id;
		if (!session || !userId) throw new Error("Unauthorized");

		const postedContents = await postContents(
			userId,
			validateContents(formData),
		);
		await sendLineNotifyMessage(formatCreateContentsMessage(postedContents));

		return {
			success: true,
			message: SUCCESS_MESSAGES.INSERT,
			data: postedContents,
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			await sendLineNotifyMessage(error.message);
			return {
				success: false,
				message: error.message,
			};
		}
		console.error("Unexpected error:", error);
		await sendLineNotifyMessage(ERROR_MESSAGES.UNEXPECTED);
		return {
			success: false,
			message: ERROR_MESSAGES.UNEXPECTED,
		};
	}
}
