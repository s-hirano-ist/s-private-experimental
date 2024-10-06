"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/send-message";
import { SUCCESS_MESSAGES } from "@/constants";
import { formatErrorForClient } from "@/error";
import { signOut as NextAuthSignOut } from "@/features/auth/lib/auth";
import type { ServerAction } from "@/types";

type SignOutState = ServerAction<undefined>;

export async function signOut(): Promise<SignOutState> {
	try {
		await NextAuthSignOut({
			redirect: false, // MEMO: await try catch文でredirectは動かない
		});
		await sendLineNotifyMessage(SUCCESS_MESSAGES.SIGN_OUT);
		return {
			success: true,
			message: SUCCESS_MESSAGES.SIGN_OUT,
			data: undefined,
		};
	} catch (error) {
		return await formatErrorForClient(error);
	}
}
