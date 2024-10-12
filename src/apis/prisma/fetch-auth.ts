"use server";
import "server-only";
import { getUserId } from "@/features/auth/utils/user-id";
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

export async function fetchUserScope(username: string) {
	const user = await prisma.users.findUnique({
		where: { username },
		select: { scope: true },
	});
	return user?.scope;
}
