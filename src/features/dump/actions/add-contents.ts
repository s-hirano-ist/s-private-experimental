"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError } from "@/error-classes";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { getSelfRole, getUserId } from "@/features/auth/utils/get-session";
import { checkPostPermission } from "@/features/auth/utils/role";
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
		const hasPostPermission = await checkPostPermission();
		if (!hasPostPermission) throw new NotAllowedError();

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
