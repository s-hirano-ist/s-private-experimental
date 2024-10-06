"use server";
import "server-only";
import type { ServerAction } from "@/types";

export type ActionState<T> =
	| (ServerAction & { success: true; data: T })
	| (ServerAction & { success: false });
