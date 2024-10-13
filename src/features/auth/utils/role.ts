"use server";
import "server-only";
import { fetchUserScope } from "@/apis/prisma/fetch-user";
import { UnexpectedError } from "@/error";
import { checkSelfAuth } from "./get-session";

// FOR /contents/* and /all
export async function checkAdminPermission() {
	const { user } = await checkSelfAuth();

	switch (user.role) {
		case "ADMIN":
			return true;
		case "EDITOR":
			return false;
		case "VIEWER":
			return false;
		case "UNAUTHORIZED":
			return false;
		default:
			throw new UnexpectedError();
	}
}

// FOR /dump/*
type ViewRole = "VIEW_ONLY" | "PROHIBITED" | "NOT_FOUND";

export async function checkViewStatus(pathname: string): Promise<ViewRole> {
	const { user } = await checkSelfAuth();

	if (user.role === "UNAUTHORIZED") return "PROHIBITED";

	if (user.username === pathname) return "VIEW_ONLY";

	const scope = await fetchUserScope(pathname);
	if (!scope) return "NOT_FOUND";
	if (scope === "PUBLIC") return "VIEW_ONLY";
	if (scope === "PRIVATE") return "PROHIBITED";

	throw new UnexpectedError();
}

// FOR /dump/* posts action
export async function checkPostPermission() {
	const { user } = await checkSelfAuth();

	switch (user.role) {
		case "ADMIN":
			return true;
		case "EDITOR":
			return true;
		case "VIEWER":
			return false;
		case "UNAUTHORIZED":
			return false;
		default:
			throw new UnexpectedError();
	}
}

// FOR drawer
export async function checkUpdateStatusPermission() {
	const { user } = await checkSelfAuth();

	switch (user.role) {
		case "ADMIN":
			return true;
		case "EDITOR":
			return true;
		case "VIEWER":
			return false;
		case "UNAUTHORIZED":
			return false;
		default:
			throw new UnexpectedError();
	}
}
