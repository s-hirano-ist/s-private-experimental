"use server";
import "server-only";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { ERROR_MESSAGES } from "./constants";
import {
	FileNotAllowedError,
	InvalidFormatError,
	LineNotifyError,
	NotAllowedError,
	UnauthorizedError,
	UnexpectedError,
} from "./error-classes";
import { loggerError, loggerWarn } from "./pino";
import type { ServerAction } from "./types";
import { sendLineNotifyMessage } from "./utils/fetch-message";

export async function wrapServerSideErrorForClient<T>(
	error: unknown,
): Promise<ServerAction<T>> {
	if (error instanceof LineNotifyError) {
		loggerError(error.message, {
			caller: "wrapServerSideErrorForClient",
			status: 500,
		});
		//MEMO: 右記は意味なし await sendLineNotifyMessage(error.message);
		return { success: false, message: error.message };
	}
	// FIXME: add error handling for MinIO errors
	if (
		error instanceof NotAllowedError ||
		error instanceof UnauthorizedError ||
		error instanceof UnexpectedError ||
		error instanceof InvalidFormatError ||
		error instanceof FileNotAllowedError
	) {
		loggerWarn(error.message, {
			caller: "wrapServerSideErrorForClient",
			status: 500,
		});
		await sendLineNotifyMessage(error.message);
		return { success: false, message: error.message };
	}
	if (error instanceof AuthError) {
		loggerWarn(error.message, {
			caller: "wrapServerSideErrorForClient",
			status: 500,
		});
		await sendLineNotifyMessage(error.message);
		switch (error.type) {
			case "CredentialsSignin":
				return {
					success: false,
					message: ERROR_MESSAGES.SIGN_IN,
				};
			default:
				return {
					success: false,
					message: ERROR_MESSAGES.SIGN_IN_UNKNOWN,
				};
		}
	}

	if (
		error instanceof Prisma.PrismaClientValidationError ||
		error instanceof Prisma.PrismaClientUnknownRequestError ||
		error instanceof Prisma.PrismaClientRustPanicError ||
		error instanceof Prisma.PrismaClientInitializationError
	) {
		loggerError(error.message, {
			caller: "wrapServerSideErrorForClient",
			status: 500,
		});
		await sendLineNotifyMessage(error.message);
		return { success: false, message: ERROR_MESSAGES.PRISMA_UNEXPECTED };
	}
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		loggerWarn(error.message, {
			caller: "wrapServerSideErrorForClient",
			status: 500,
		});
		await sendLineNotifyMessage(error.message);
		return { success: false, message: ERROR_MESSAGES.PRISMA_DUPLICATE };
	}

	if (error instanceof Error) {
		loggerError(error.message, {
			caller: "wrapServerSideErrorForClient",
			status: 500,
		});
		await sendLineNotifyMessage(error.message);
	} else {
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "wrapServerSideErrorForClient",
				status: 500,
			},
			error,
		);
		await sendLineNotifyMessage(ERROR_MESSAGES.UNEXPECTED);
	}
	return { success: false, message: ERROR_MESSAGES.UNEXPECTED };
}
