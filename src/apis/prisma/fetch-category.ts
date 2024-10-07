"use server";
import "server-only";
import { getUserId } from "@/features/auth/lib/user-id";
import type { validateCategory } from "@/features/dump/utils/validate-category";
import prisma from "@/prisma";

export async function createCategory(
	validatedCategory: ReturnType<typeof validateCategory>,
) {
	const userId = await getUserId();

	return await prisma.categories.create({
		data: { userId, ...validatedCategory },
	});
}

export async function getCategories() {
	const userId = await getUserId();

	return await prisma.categories.findMany({
		where: { userId },
		select: { id: true, name: true },
	});
}
