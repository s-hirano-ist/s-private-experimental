"use server";
import "server-only";
import prisma from "@/prisma";
import { getUserId } from "./user-id";

export async function getProfile() {
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
