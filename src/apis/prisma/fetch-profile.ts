"use server";
import "server-only";
import { getUserId } from "@/features/auth/utils/get-session";
import type { ProfileSchema } from "@/features/profile/schemas/profile-schema";
import prisma from "@/prisma";

// everyone can access
export async function getProfile(username: string) {
	return await prisma.users.findUniqueOrThrow({
		where: { username },
		select: { Profile: true },
	});
}

// SELF
export async function getSelfProfile() {
	const userId = await getUserId();

	const profile = await prisma.profiles.findUnique({
		where: { userId },
		select: { name: true, bio: true, avatarUrl: true },
	});
	if (!profile) return undefined;
	return {
		name: profile.name,
		bio: profile.bio ?? undefined,
		avatarUrl: profile.avatarUrl ?? undefined,
	};
}

export async function upsertSelfProfile(data: ProfileSchema) {
	const userId = await getUserId();

	return await prisma.profiles.upsert({
		where: { userId },
		update: data,
		create: { userId, ...data },
	});
}
