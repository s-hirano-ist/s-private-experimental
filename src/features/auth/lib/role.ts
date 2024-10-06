"use server";
import "server-only";
import { ERROR_MESSAGES } from "@/constants";
import { auth } from "./auth";

export async function checkAuth() {
	const session = await auth();
	if (!session) throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
	return session;
}

export async function checkAdminPermission() {
	const { user } = await checkAuth();

	switch (user.role) {
		case "ADMIN":
			return true;
		case "EDITOR":
			return false;
		case "VIEWER":
			return false;
		default:
			throw new Error(ERROR_MESSAGES.UNEXPECTED);
	}
}

export async function checkPostPermission() {
	const { user } = await checkAuth();

	switch (user.role) {
		case "ADMIN":
			return true;
		case "EDITOR":
			return true;
		case "VIEWER":
			return false;
		default:
			throw new Error(ERROR_MESSAGES.UNEXPECTED);
	}
}

export async function checkUpdateStatusPermission() {
	const { user } = await checkAuth();

	switch (user.role) {
		case "ADMIN":
			return true;
		case "EDITOR":
			return true;
		case "VIEWER":
			return false;
		default:
			throw new Error(ERROR_MESSAGES.UNEXPECTED);
	}
}
