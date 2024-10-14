import "server-only";
import { getUserId } from "@/features/auth/utils/get-session";
import type { validateCategory } from "@/features/dump/utils/validate-category";
import prisma from "@/prisma";

// SELF
export async function createSelfCategory(
	validatedCategory: ReturnType<typeof validateCategory>,
) {
	const userId = await getUserId();

	return await prisma.categories.create({
		data: { userId, ...validatedCategory },
	});
}

export async function getSelfCategories() {
	const userId = await getUserId();

	return await prisma.categories.findMany({
		where: { userId },
		select: { id: true, name: true },
	});
}
