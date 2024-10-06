"use server";
import "server-only";
import { checkAuth } from "./role";

export async function getUserId() {
	const { user } = await checkAuth();
	return user.id;
}
