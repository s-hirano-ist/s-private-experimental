"use server";
import "server-only"; // TODO: 検証 client-onlyとかになったときのbuildエラー
import type { validateNews } from "@/features/dump/utils/validate-news";
import prisma from "@/server/db";
import type { Status } from "@/types/status";

export async function postNews(
	userId: string,
	validatedNews: ReturnType<typeof validateNews>,
) {
	return await prisma.news.create({
		data: { userId, ...validatedNews },
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
			categories: true,
		},
	});
}

export async function getUnexportedNews(userId: string) {
	return await prisma.news.findMany({
		where: { status: "UNEXPORTED", userId },
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
			categories: { select: { name: true } },
		},
		orderBy: { id: "desc" },
	});
}

export async function getAllNews() {
	return await prisma.news.findMany({
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
			status: true,
			categories: { select: { name: true } },
		},
	});
}

export async function updateNewsStatus(): Promise<Status> {
	return await prisma.$transaction(async (prisma) => {
		const exportedData = await prisma.news.updateMany({
			where: { status: "UPDATED_RECENTLY" },
			data: { status: "EXPORTED" },
		});
		const recentlyUpdatedData = await prisma.news.updateMany({
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

export async function revertNewsStatus(): Promise<Status> {
	return await prisma.$transaction(async (prisma) => {
		const unexportedData = await prisma.news.updateMany({
			where: { status: "UPDATED_RECENTLY" },
			data: { status: "UNEXPORTED" },
		});
		const recentlyUpdatedData = await prisma.news.updateMany({
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
