import { SUCCESS_MESSAGES } from "@/constants";
import { env } from "@/env.mjs";
import { wrapServerSideErrorForClient } from "@/error-wrapper";
import { hasSelfPostPermissionOrThrow } from "@/features/auth/utils/get-session";
import { minioClient } from "@/minio";
import type { ServerAction } from "@/types";

export async function GenerateUrl(
	fileName: string,
): Promise<ServerAction<string>> {
	try {
		await hasSelfPostPermissionOrThrow();

		const url = await minioClient.presignedGetObject(
			env.MINIO_BUCKET_NAME,
			fileName,
			24 * 60 * 60,
		);

		return {
			success: true,
			message: SUCCESS_MESSAGES.INSERTED,
			data: url,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
