"use server";
import "server-only";
import { fetchUserScope } from "@/apis/prisma/fetch-auth";
import { UnauthorizedError, UnexpectedError } from "@/error";
import { auth } from "./auth";

export async function checkAuth() {
	const session = await auth();
	if (!session) throw new UnauthorizedError();
	return session;
}

// FOR /contents/* and /all
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

// FOR /dump/*
type ViewRole = "VIEW_ONLY" | "PROHIBITED" | "NOT_FOUND";

export async function checkViewStatus(pathname: string): Promise<ViewRole> {
	const { user } = await checkAuth();

	if (user.role === "UNAUTHORIZED") return "PROHIBITED";

	if (user.username === pathname) return "VIEW_ONLY";

	const scope = await fetchUserScope(pathname);
	if (!scope) return "NOT_FOUND";
	if (scope === "PUBLIC") return "VIEW_ONLY";
	if (scope === "PRIVATE") return "PROHIBITED";

	return "PROHIBITED";
}

// FOR /dump/* posts action
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

// FOR drawer
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
