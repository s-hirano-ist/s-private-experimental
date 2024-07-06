"use server";
import prisma from "@/server/db";
import type { Status } from "@/types/status";

export async function updateMypageStatus(): Promise<Status> {
	return await prisma.$transaction(async (prisma) => {
		const exportedData = await prisma.mypage.updateMany({
			where: { status: "UPDATED_RECENTLY" },
			data: { status: "EXPORTED" },
		});
		const recentlyUpdatedData = await prisma.mypage.updateMany({
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

export async function revertMypageStatus(): Promise<Status> {
	return await prisma.$transaction(async (prisma) => {
		const unexportedData = await prisma.mypage.updateMany({
			where: { status: "UPDATED_RECENTLY" },
			data: { status: "UNEXPORTED" },
		});
		const recentlyUpdatedData = await prisma.mypage.updateMany({
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
