"use server";
import "server-only";
import { ERROR_MESSAGES } from "@/constants";
import { getUserId } from "@/features/auth/utils/get-session";
import { AddNewsForm } from "@/features/dump/components/add-news-form";
import { loggerError } from "@/pino";
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
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "AddNewsProvider",
				status: 500,
			},
			error,
		);
		return <></>;
	}
}
