"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { NotAllowedError, UnexpectedError } from "@/error-classes";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { getUserId } from "@/features/auth/utils/get-session";
import { checkUpdateStatusPermission } from "@/features/auth/utils/role";
import type { Status, UpdateOrRevert } from "@/features/update-status/types";
import prisma from "@/prisma";
import type { ServerAction } from "@/types";
import { sendLineNotifyMessage } from "@/utils/fetch-message";
import { formatChangeStatusMessage } from "@/utils/format-for-line";

async function updateSelfNewsStatus(): Promise<Status> {
	const userId = await getUserId();

	return await prisma.$transaction(async (prisma) => {
		const exportedData = await prisma.news.updateMany({
			where: { status: "UPDATED_RECENTLY", userId },
			data: { status: "EXPORTED" },
		});
		const recentlyUpdatedData = await prisma.news.updateMany({
			where: { status: "UNEXPORTED", userId },
			data: { status: "UPDATED_RECENTLY" },
		});
		return {
			unexported: 0,
			recentlyUpdated: recentlyUpdatedData.count,
			exported: exportedData.count,
		};
	});
}

async function revertSelfNewsStatus(): Promise<Status> {
	const userId = await getUserId();

	return await prisma.$transaction(async (prisma) => {
		const unexportedData = await prisma.news.updateMany({
			where: { status: "UPDATED_RECENTLY", userId },
			data: { status: "UNEXPORTED" },
		});
		const recentlyUpdatedData = await prisma.news.updateMany({
			where: { status: "EXPORTED", userId },
			data: { status: "UPDATED_RECENTLY" },
		});
		return {
			unexported: unexportedData.count,
			recentlyUpdated: recentlyUpdatedData.count,
			exported: 0,
		};
	});
}

const handleStatusChange = async (changeType: UpdateOrRevert) => {
	switch (changeType) {
		case "UPDATE":
			return await updateSelfNewsStatus();
		case "REVERT":
			return await revertSelfNewsStatus();
		default:
			throw new UnexpectedError();
	}
};

type ToastMessage = string;

export async function changeNewsStatus(
	updateOrRevert: UpdateOrRevert,
): Promise<ServerAction<ToastMessage>> {
	try {
		const hasUpdateStatusPermission = await checkUpdateStatusPermission();
		if (!hasUpdateStatusPermission) throw new NotAllowedError();

		const data = formatChangeStatusMessage(
			await handleStatusChange(updateOrRevert),
			"NEWS",
		);
		await sendLineNotifyMessage(data);
		return { success: true, message: SUCCESS_MESSAGES.UPDATE, data };
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
