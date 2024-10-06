import type { ServerAction } from "@/types";

export type ActionState<T> =
	| (ServerAction & { success: true; data: T })
	| (ServerAction & { success: false });
