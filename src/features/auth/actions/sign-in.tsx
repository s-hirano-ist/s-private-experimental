"use server";
import "server-only";
import { sendLineNotifyMessage } from "@/apis/line-notify/fetch-message";
import { SUCCESS_MESSAGES } from "@/constants";
import { wrapServerSideErrorForClient } from "@/error";
import type { SignInSchema } from "@/features/auth/schemas/sign-in-schema";
import { signIn as NextAuthSignIn } from "@/features/auth/utils/auth";
import type { ServerAction } from "@/types";

type SignInState = ServerAction<undefined>;

export async function signIn(values: SignInSchema): Promise<SignInState> {
	try {
		await NextAuthSignIn("credentials", {
			...values,
			redirect: false, // MEMO: await try catch文でredirectは動かない
		});
		await sendLineNotifyMessage(SUCCESS_MESSAGES.SIGN_IN);
		return {
			success: true,
			message: SUCCESS_MESSAGES.SIGN_IN,
			data: undefined,
		};
	} catch (error) {
		return await wrapServerSideErrorForClient(error);
	}
}
