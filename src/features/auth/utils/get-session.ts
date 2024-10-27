import "server-only";
import { ERROR_MESSAGES } from "@/constants";
import { NotAllowedError /*, UnauthorizedError*/ } from "@/error-classes";
import { loggerWarn } from "@/pino";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import {
	checkAdminPermission,
	checkPostPermission,
	checkUpdateStatusPermission,
} from "./role";

export async function checkSelfAuthOrRedirectToAuth() {
	const session = await auth();
	if (!session) {
		loggerWarn(ERROR_MESSAGES.UNAUTHORIZED, {
			caller: "Unauthorized on checkSelfAuth",
			status: 403,
		});
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
	const { user } = await checkSelfAuthOrRedirectToAuth();
	return user.id;
}

export async function getSelfRole() {
	const { user } = await checkSelfAuthOrRedirectToAuth();
	return user.role;
}
