"use server";
import "server-only";
import type { validateNews } from "@/features/dump/utils/validate-news";
import type { Status } from "@/features/update-status/types";
import prisma from "@/prisma";

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
			category: true,
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
			category: { select: { name: true } },
		},
		orderBy: { id: "desc" },
	});
}

export async function updateNewsStatus(userId: string): Promise<Status> {
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

export async function revertNewsStatus(userId: string): Promise<Status> {
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

// ROLE === "admin" only
export async function getAllNews() {
	return await prisma.news.findMany({
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
			status: true,
			category: { select: { name: true } },
		},
	});
}
