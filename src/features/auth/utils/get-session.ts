"use server";
import "server-only";
import { UnauthorizedError } from "@/error-classes";
// import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function checkSelfAuth() {
	const session = await auth();
	if (!session) {
		throw new UnauthorizedError();
		// redirect("/auth"); // WHEN MIDDLEWARE DO NOT WORK
	}
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
