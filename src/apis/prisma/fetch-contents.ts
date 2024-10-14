import "server-only";
import { NotAllowedError } from "@/error-classes";
import { getSelfRole, getUserId } from "@/features/auth/utils/get-session";
import type { validateContents } from "@/features/dump/utils/validate-contents";
import type { Status } from "@/features/update-status/types";
import prisma from "@/prisma";

// SELF
export async function createSelfContents(
	validatedFields: ReturnType<typeof validateContents>,
) {
	const userId = await getUserId();

	return await prisma.contents.create({
		data: { userId, ...validatedFields },
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
		},
	});
}

export async function getSelfUnexportedContents() {
	const userId = await getUserId();

	return await prisma.contents.findMany({
		where: { status: "UNEXPORTED", userId },
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
		},
		orderBy: { id: "desc" },
	});
}

export async function updateSelfContentsStatus(): Promise<Status> {
	const userId = await getUserId();

	return await prisma.$transaction(async (prisma) => {
		const exportedData = await prisma.contents.updateMany({
			where: { status: "UPDATED_RECENTLY", userId },
			data: { status: "EXPORTED" },
		});
		const recentlyUpdatedData = await prisma.contents.updateMany({
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

export async function revertSelfContentsStatus(): Promise<Status> {
	const userId = await getUserId();

	return await prisma.$transaction(async (prisma) => {
		const unexportedData = await prisma.contents.updateMany({
			where: { status: "UPDATED_RECENTLY", userId },
			data: { status: "UNEXPORTED" },
		});
		const recentlyUpdatedData = await prisma.contents.updateMany({
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

// ROLE === "admin" only
export async function getAllContents() {
	const role = await getSelfRole();

	if (role !== "ADMIN") throw new NotAllowedError();

	return await prisma.contents.findMany({
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
			status: true,
		},
	});
}
