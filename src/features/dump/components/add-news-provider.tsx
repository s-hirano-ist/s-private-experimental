"use server";
import "server-only";
import { getUserId } from "@/features/auth/utils/get-session";
import { AddNewsForm } from "@/features/dump/components/add-news-form";
import prisma from "@/prisma";

export async function AddNewsProvider() {
	try {
		const userId = await getUserId();
		const categories = await prisma.categories.findMany({
			where: { userId },
			select: { id: true, name: true },
		});

		return <AddNewsForm categories={categories} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
