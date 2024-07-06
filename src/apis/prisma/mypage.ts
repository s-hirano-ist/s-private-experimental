import prisma from "@/server/db";
import type { SafeParseSuccess } from "zod";

export async function createMypage(
	validatedFields: SafeParseSuccess<{
		title: string;
		quote: string;
		url: string;
	}>,
) {
	return await prisma.mypage.create({
		data: validatedFields.data,
	});
}

export async function getUnexportedMypage() {
	return await prisma.mypage.findMany({
		where: { status: "UNEXPORTED" },
		select: {
			id: true,
			title: true,
			quote: true,
			url: true,
		},
		orderBy: {
			id: "desc",
		},
	});
}
