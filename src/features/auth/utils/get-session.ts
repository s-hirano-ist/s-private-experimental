import "server-only";
import { NotAllowedError /*, UnauthorizedError*/ } from "@/error-classes";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import {
	checkAdminPermission,
	checkPostPermission,
	checkUpdateStatusPermission,
} from "./role";

export async function checkSelfAuth() {
	const session = await auth();
	if (!session) {
		// throw new UnauthorizedError();
		// FIXME: https://github.com/s-hirano-ist/s-private/issues/440
		redirect("/auth"); // WHEN MIDDLEWARE DO NOT WORK
	}
	return session;
}

export async function hasAdminPermissionOrThrow() {
	const hasAdminPermission = await checkAdminPermission();
	if (!hasAdminPermission) throw new NotAllowedError();
}

export async function hasSelfPostPermissionOrThrow() {
	const hasPostPermission = await checkPostPermission();
	if (!hasPostPermission) throw new NotAllowedError();
}

export async function hasUpdateStatusPermissionOrThrow() {
	const hasUpdateStatusPermission = await checkUpdateStatusPermission();
	if (!hasUpdateStatusPermission) throw new NotAllowedError();
}

export async function getUserId() {
	const { user } = await checkSelfAuth();
	return user.id;
}

export async function getSelfRole() {
	const { user } = await checkSelfAuth();
	return user.role;
}
