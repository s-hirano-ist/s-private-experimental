"use server";
import "server-only";
import { StatusCodeView } from "@/components/status-code-view";
import { ERROR_MESSAGES } from "@/constants";
import { getUserId } from "@/features/auth/utils/get-session";
import { loggerError } from "@/pino";
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
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "ImageStackProvider",
				status: 500,
			},
			error,
		);
		return (
			<div className="flex flex-col items-center">
				<StatusCodeView statusCode="500" />
			</div>
		);
	}
}
