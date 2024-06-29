import prisma from "@/server/db";
import type { SafeParseSuccess } from "zod";

export async function createNewsDetail(
	validatedFields: SafeParseSuccess<{
		title: string;
		categoryId: number;
		quote: string;
		url: string;
	}>,
) {
	return await prisma.newsDetail.create({
		data: validatedFields.data,
		include: {
			category: true,
		},
	});
}

export async function getUnexportedNewsDetails() {
	return await prisma.newsDetail.findMany({
		where: { exported: false },
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
			category: { select: { category: true } },
		},
		orderBy: {
			id: "desc",
		},
	});
}

export async function getAllNewsDetails() {
	return await prisma.newsDetail.findMany({
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
			category: { select: { category: true } },
		},
	});
}
