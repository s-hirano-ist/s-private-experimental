"use server";
import prisma from "@/server/db";
import type { Status } from "@/types/status";

// FIXME: refactor: change-mypage-statusと統一させる

export async function updateBlogStatus(): Promise<Status> {
	return await prisma.$transaction(async (prisma) => {
		const exportedData = await prisma.blog.updateMany({
			where: { status: "UPDATED_RECENTLY" },
			data: { status: "EXPORTED" },
		});
		const recentlyUpdatedData = await prisma.blog.updateMany({
			where: { status: "UNEXPORTED" },
			data: { status: "UPDATED_RECENTLY" },
		});
		return {
			unexported: 0,
			recentlyUpdated: recentlyUpdatedData.count,
			exported: exportedData.count,
		};
	});
}

export async function revertBlogStatus(): Promise<Status> {
	return await prisma.$transaction(async (prisma) => {
		const unexportedData = await prisma.blog.updateMany({
			where: { status: "UPDATED_RECENTLY" },
			data: { status: "UNEXPORTED" },
		});
		const recentlyUpdatedData = await prisma.blog.updateMany({
			where: { status: "EXPORTED" },
			data: { status: "UPDATED_RECENTLY" },
		});
		return {
			unexported: unexportedData.count,
			recentlyUpdated: recentlyUpdatedData.count,
			exported: 0,
		};
	});
}
