"use server";
import "server-only";
import { getUserId } from "@/features/auth/lib/user-id";
import type { validateContents } from "@/features/dump/utils/validate-contents";
import type { Status } from "@/features/update-status/types";
import prisma from "@/prisma";

export async function createContents(
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

export async function getUnexportedContents() {
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

export async function updateContentsStatus(): Promise<Status> {
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

export async function revertContentsStatus(): Promise<Status> {
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
