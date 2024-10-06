"use server";
import "server-only";
import type { validateCategory } from "@/features/dump/utils/validate-category";
import prisma from "@/prisma";

export async function createCategory(
	userId: string,
	validatedCategory: ReturnType<typeof validateCategory>,
) {
	return await prisma.categories.create({
		data: { userId, ...validatedCategory },
	});
}

export async function getCategories(userId: string) {
	return await prisma.categories.findMany({
		where: { userId },
		select: { id: true, name: true },
	});
}
