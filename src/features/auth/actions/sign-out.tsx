"use server";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import { signOut as NextAuthSignOut } from "@/features/auth/lib/auth";
import type { ServerAction } from "@/types/server-action";

type SignOutState = ServerAction;

export async function signOut(): Promise<SignOutState> {
	try {
		await NextAuthSignOut({
			redirect: false, // MEMO: await try catch文でredirectは動かない
		});
		return { success: true, message: SUCCESS_MESSAGES.SIGN_OUT };
	} catch (error) {
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
