"use server";
import "server-only";
import { getUserId } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";

// SELF
export async function createSelfLoginHistory(
	ipAddress: string,
	userAgent: string,
) {
	const userId = await getUserId();

	return await prisma.loginHistories.create({
		data: {
			userId,
			ipAddress,
			userAgent,
		},
	});
}
