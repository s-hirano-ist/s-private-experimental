"use server";
import "server-only";
import { getUserId } from "@/features/auth/utils/user-id";
import type { ProfileSchema } from "@/features/profile/schemas/profile-schema";
import prisma from "@/prisma";

export async function upsertProfile(data: ProfileSchema) {
	const userId = await getUserId();
	return await prisma.profiles.upsert({
		where: { userId },
		update: data,
		create: { userId, ...data },
	});
}

// TODO: 以下はusername認証系に移動
export async function getProfile(username: string) {
	return await prisma.users.findUniqueOrThrow({
		where: { username },
		select: { Profile: true },
	});
}

export async function getNewsAndContents(username: string) {
	return await prisma.users.findUniqueOrThrow({
		where: { username },
		select: {
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
}
