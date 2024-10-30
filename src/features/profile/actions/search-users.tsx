"use server";
import "server-only";
import { checkSelfAuthOrRedirectToAuth } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";

export async function searchUsers(searchString: string) {
	await checkSelfAuthOrRedirectToAuth();
	return await prisma.users.findMany({
		select: {
			username: true,
			role: true,
		},
		where: {
			username: {
				contains: searchString,
			},
		},
		take: 10,
	});
}
