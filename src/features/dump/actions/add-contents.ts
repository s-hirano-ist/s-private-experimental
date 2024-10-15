"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import {
	getUserId,
	hasSelfPostPermissionOrThrow,
} from "@/features/auth/utils/get-session";
import type { ContentsContext } from "@/features/dump/stores/contents-context";
import { validateContents } from "@/features/dump/utils/validate-contents";
import prisma from "@/prisma";
import type { ServerAction } from "@/types";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatCreateContentsMessage } from "@/utils/format-for-line";

export async function addContents(
	formData: FormData,
): Promise<ServerAction<ContentsContext>> {
	try {
		await hasSelfPostPermissionOrThrow();

		const userId = await getUserId();

		const createdContents = await prisma.contents.create({
			data: { userId, ...validateContents(formData) },
			select: {
				id: true,
				title: true,
				quote: true,
				url: true,
			},
		});

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
