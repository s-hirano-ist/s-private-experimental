"use server";
import "server-only";

type Action = {
	success: boolean;
	message: string;
};

export type ServerAction<T> =
	| (Action & { success: true; data: T })
	| (Action & { success: false });
