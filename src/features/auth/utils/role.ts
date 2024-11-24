import "server-only";
import { UnexpectedError } from "@/error-classes";
import prisma from "@/prisma";
import { checkSelfAuthOrThrow } from "./get-session";

// everyone can access
async function getUserScope(username: string) {
	const user = await prisma.users.findUnique({
		where: { username },
		select: { scope: true },
	});
	return user?.scope;
}

// FOR /contents/* and /all

export async function checkAdminPermission() {
	const { user } = await checkSelfAuthOrThrow();

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
	const { user } = await checkSelfAuthOrThrow();

	if (user.role === "UNAUTHORIZED") return "PROHIBITED";

	if (user.username === pathname) return "VIEW_ONLY";

	const scope = await getUserScope(pathname);
	if (!scope) return "NOT_FOUND";
	if (scope === "PUBLIC") return "VIEW_ONLY";
	if (scope === "PRIVATE") return "PROHIBITED";

	throw new UnexpectedError();
}

// FOR /dump/* posts action
export async function checkPostPermission() {
	const { user } = await checkSelfAuthOrThrow();

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
	const { user } = await checkSelfAuthOrThrow();

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
