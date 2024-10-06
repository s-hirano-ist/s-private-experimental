import type { ServerAction } from "@/types/server-action";

export type ActionState<T> =
	| (ServerAction & { success: true; data: T })
	| (ServerAction & { success: false });
