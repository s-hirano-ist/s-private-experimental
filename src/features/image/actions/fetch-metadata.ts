"use server";
import "server-only";
import { SUCCESS_MESSAGES } from "@/constants";
import { UnexpectedError } from "@/error-classes";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { hasSelfPostPermissionOrThrow } from "@/features/auth/utils/get-session";
import type { ServerAction } from "@/types";
import sharp, { type Metadata } from "sharp";

export async function fetchMetadata(
	url: string,
): Promise<ServerAction<Metadata>> {
	try {
		await hasSelfPostPermissionOrThrow();

		const response = await fetch(url);
		if (!response.ok) throw new UnexpectedError();

		const imageBuffer = await response.arrayBuffer();
		const metadata = await sharp(imageBuffer).metadata();

		return {
			success: true,
			message: SUCCESS_MESSAGES.INSERTED,
			data: metadata,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
