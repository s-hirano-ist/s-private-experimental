"use server";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import { signIn as NextAuthSignIn } from "@/features/auth/lib/auth";
import type { SignInSchema } from "@/features/auth/schemas/sign-in-schema";
import type { ServerAction } from "@/types";
import { AuthError } from "next-auth";

type SignInState = ServerAction;

export async function signIn(values: SignInSchema): Promise<SignInState> {
	try {
		await NextAuthSignIn("credentials", {
			...values,
			redirect: false, // MEMO: await try catch文でredirectは動かない
		});
		await sendLineNotifyMessage(SUCCESS_MESSAGES.SIGN_IN);
		return { success: true, message: SUCCESS_MESSAGES.SIGN_IN };
	} catch (error) {
		if (error instanceof AuthError) {
			await sendLineNotifyMessage(ERROR_MESSAGES.SIGN_IN);
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
		if (error instanceof Error) {
			console.error(error.message);
			await sendLineNotifyMessage(error.message);
			return {
				success: false,
				message: error.message,
			};
		}
		console.error("Unexpected error:", error);
		await sendLineNotifyMessage(ERROR_MESSAGES.UNEXPECTED);
		return {
			success: false,
			message: ERROR_MESSAGES.UNEXPECTED,
		};
	}
}
