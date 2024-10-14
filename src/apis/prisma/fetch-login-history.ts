import "server-only";
import prisma from "@/prisma";
import { getUserIdForLoginHistory } from "./fetch-user";

// SELF
export async function createSelfLoginHistory(
	username: string,
	ipAddress: string | undefined,
	userAgent: string | undefined,
) {
	const userId = await getUserIdForLoginHistory(username);
	return await prisma.loginHistories.create({
		data: {
			userId,
			ipAddress,
			userAgent,
		},
	});
}
