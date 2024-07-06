import prisma from "@/server/db";

export async function createCategory(newCategory: string) {
	return await prisma.category.create({
		data: { category: newCategory },
	});
}

export async function getCategories() {
	return await prisma.category.findMany({
		select: { id: true, category: true },
	});
}
