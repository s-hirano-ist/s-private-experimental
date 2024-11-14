"use server";
import "server-only";
import { StatusCodeView } from "@/components/status-code-view";
import { getUserId } from "@/features/auth/utils/get-session";
import prisma from "@/prisma";
import { ImageStack } from "./image-stack";

export async function ImageStackProvider() {
	try {
		const userId = await getUserId();

		const images = await prisma.images.findMany({
			where: { userId, status: "UNEXPORTED" },
			select: {
				id: true,
			},
			orderBy: { id: "desc" },
		});

		return <ImageStack images={images} />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView statusCode="500" />
			</div>
		);
	}
}
