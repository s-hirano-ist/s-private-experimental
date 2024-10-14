"use server";
import "server-only";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { ERROR_MESSAGES } from "./constants";
import {
	InvalidFormatError,
	LineNotifyError,
	NotAllowedError,
	UnauthorizedError,
	UnexpectedError,
} from "./error-classes";
import type { ServerAction } from "./types";
import { sendLineNotifyMessage } from "./utils/fetch-message";

export async function wrapServerSideErrorForClient<T>(
	error: unknown,
): Promise<ServerAction<T>> {
	if (error instanceof LineNotifyError) {
		console.error(error.message);
		//MEMO: 右記は意味なし await sendLineNotifyMessage(error.message);
		return { success: false, message: error.message };
	}
	if (
		error instanceof NotAllowedError ||
		error instanceof UnauthorizedError ||
		error instanceof UnexpectedError ||
		error instanceof InvalidFormatError
	) {
		console.error(error.message);
		await sendLineNotifyMessage(error.message);
		return { success: false, message: error.message };
	}
	if (error instanceof AuthError) {
		console.error(error.message);
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
		console.error(error.message);
		await sendLineNotifyMessage(error.message);
		return { success: false, message: ERROR_MESSAGES.PRISMA_UNEXPECTED };
	}
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		console.error(error.message);
		await sendLineNotifyMessage(error.message);
		return { success: false, message: ERROR_MESSAGES.PRISMA_DUPLICATE };
	}

	if (error instanceof Error) {
		console.error(error.message);
		await sendLineNotifyMessage(error.message);
	} else {
		console.error(error);
		await sendLineNotifyMessage(ERROR_MESSAGES.UNEXPECTED);
	}
	return { success: false, message: ERROR_MESSAGES.UNEXPECTED };
}
