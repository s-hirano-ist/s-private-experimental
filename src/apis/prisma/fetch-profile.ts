"use server";
import "server-only";
import prisma from "@/prisma";

export async function getProfile(username: string) {
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
