"use server";
import prisma from "@/server/db";

export type ChangeStatus = {
	unexported: number;
	recentlyUpdated: number;
	exported: number;
};

export async function updateNewsDetailStatus(): Promise<ChangeStatus> {
	return await prisma.$transaction(async (prisma) => {
		const exportedData = await prisma.newsDetail.updateMany({
			where: { status: "UPDATED_RECENTLY" },
			data: { status: "EXPORTED" },
		});
		const recentlyUpdatedData = await prisma.newsDetail.updateMany({
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

export async function revertNewsDetailStatus(): Promise<ChangeStatus> {
	return await prisma.$transaction(async (prisma) => {
		const unexportedData = await prisma.newsDetail.updateMany({
			where: { status: "UPDATED_RECENTLY" },
			data: { status: "UNEXPORTED" },
		});
		const recentlyUpdatedData = await prisma.newsDetail.updateMany({
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
