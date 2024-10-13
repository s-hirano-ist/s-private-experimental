"use server";
import "server-only";
import { UnauthorizedError } from "@/error";
import { auth } from "./auth";

export async function checkSelfAuth() {
	const session = await auth();
	if (!session) throw new UnauthorizedError();
	return session;
}

export async function getUserId() {
	const { user } = await checkSelfAuth();
	return user.id;
}

export async function getSelfRole() {
	const { user } = await checkSelfAuth();
	return user.role;
}
