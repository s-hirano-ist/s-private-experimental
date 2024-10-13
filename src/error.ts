import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { sendLineNotifyMessage } from "./apis/line-notify/fetch-message";
import { ERROR_MESSAGES, FORM_ERROR_MESSAGES } from "./constants";
import type { ServerAction } from "./types";

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

export class LineNotifyError extends Error {
	constructor() {
		super(ERROR_MESSAGES.LINE_SEND);
		this.name = "LineNotifyError";
	}
}

export class NotAllowedError extends Error {
	constructor() {
		super(ERROR_MESSAGES.NOT_ALLOWED);
		this.name = "NotAllowedError";
	}
}

export class UnauthorizedError extends Error {
	constructor() {
		super(ERROR_MESSAGES.UNAUTHORIZED);
		this.name = "UnauthorizedError";
	}
}

export class UnexpectedError extends Error {
	constructor() {
		super(ERROR_MESSAGES.UNEXPECTED);
		this.name = "UnexpectedError";
	}
}

export class InvalidFormatError extends Error {
	constructor() {
		super(FORM_ERROR_MESSAGES.INVALID_FORMAT);
		this.name = "InvalidFormatError";
	}
}
