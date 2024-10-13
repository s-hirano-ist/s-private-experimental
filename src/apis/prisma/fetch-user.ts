"use server";
import "server-only";
import { NotAllowedError } from "@/error";
import { getUserId } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import type { Scope } from "@prisma/client";

// everyone can access
export async function getUserScope(username: string) {
	const user = await prisma.users.findUnique({
		where: { username },
		select: { scope: true },
	});
	return user?.scope;
}

// restricted from specific usage
export async function getUserIdForLoginHistory(username: string) {
	const user = await prisma.users.findUniqueOrThrow({
		where: { username },
		select: { id: true },
	});
	return user.id;
}

// SELF
export async function getSelfScope() {
	const userId = await getUserId();
	const user = await prisma.users.findUniqueOrThrow({
		where: { id: userId },
		select: { scope: true },
	});
	return user.scope;
}

export async function updateSelfScope(scope: Scope) {
	const userId = await getUserId();
	return await prisma.users.update({
		where: { id: userId },
		data: { scope },
	});
}

// accessed path's username.scope === private || user's own page
export async function getNewsAndContents(username: string) {
	const userId = await getUserId();

	const user = await prisma.users.findUniqueOrThrow({ where: { id: userId } });
	if (user.role === "UNAUTHORIZED") throw new NotAllowedError();

	const newsAndContents = await prisma.users.findUniqueOrThrow({
		where: { username },
		select: {
			scope: true,
			News: {
				select: {
					id: true,
					title: true,
					quote: true,
					url: true,
					Category: { select: { name: true } },
				},
			},
			Contents: {
				select: {
					id: true,
					title: true,
					quote: true,
					url: true,
				},
			},
		},
	});
	if (newsAndContents.scope === "PRIVATE" && username !== user.username)
		throw new NotAllowedError();

	return newsAndContents;
}
