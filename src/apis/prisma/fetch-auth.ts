"use server";
import "server-only";
import { getUserId } from "@/features/auth/lib/user-id";
import prisma from "@/prisma";

export async function createLoginHistory(ipAddress: string, userAgent: string) {
	const userId = await getUserId();

	return await prisma.loginHistories.create({
		data: {
			userId,
			ipAddress,
			userAgent,
		},
	});
}
