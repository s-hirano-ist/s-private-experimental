"use server";
import "server-only";
import { UnauthorizedError, UnexpectedError } from "@/error";
import { auth } from "./auth";

export async function checkAuth() {
	const session = await auth();
	if (!session) throw new UnauthorizedError();
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
			throw new UnexpectedError();
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
			throw new UnexpectedError();
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
			throw new UnexpectedError();
	}
}
