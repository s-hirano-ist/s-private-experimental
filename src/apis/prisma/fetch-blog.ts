import prisma from "@/server/db";
import type { SafeParseSuccess } from "zod";

export async function createBlog(
	validatedFields: SafeParseSuccess<{
		title: string;
		categoryId: number;
		quote: string;
		url: string;
	}>,
) {
	return await prisma.blog.create({
		data: validatedFields.data,
		include: {
			category: true,
		},
	});
}

export async function getUnexportedBlog() {
	return await prisma.blog.findMany({
		where: { status: "UNEXPORTED" },
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
			category: { select: { name: true } },
		},
		orderBy: {
			id: "desc",
		},
	});
}

export async function getAllBlog() {
	return await prisma.blog.findMany({
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
