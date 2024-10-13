"use server";
import "server-only";
import { getUserId } from "@/features/auth/utils/user-id";
import prisma from "@/prisma";
import type { Scope } from "@prisma/client";

export async function getScope() {
	const userId = await getUserId();
	const user = await prisma.users.findUniqueOrThrow({
		where: { id: userId },
		select: { scope: true },
	});
	return user.scope;
}

export async function updateScope(scope: Scope) {
	const userId = await getUserId();
	return await prisma.users.update({
		where: { id: userId },
		data: { scope },
	});
}
