import { auth } from "@/features/auth/lib/auth";
import { DEFAULT_SIGN_IN_REDIRECT } from "./constants";
export const publicRoutes: string[] = [];
export const authRoutes: string[] = ["/auth"];
export const apiAuthPrefix = "/api/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
	const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
	const cspHeader = `
	  default-src 'self';
	  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
	  style-src 'self' 'nonce-${nonce}';
	  img-src 'self' blob: data:;
	  font-src 'self';
	  object-src 'none';
	  base-uri 'self';
	  form-action 'self';
	  frame-ancestors 'none';
	  upgrade-insecure-requests;`;

	// Replace newline characters and spaces
	const contentSecurityPolicyHeaderValue = cspHeader
		.replace(/\s{2,}/g, " ")
		.trim();

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);

	requestHeaders.set(
		"Content-Security-Policy",
		contentSecurityPolicyHeaderValue,
	);

	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
	response.headers.set(
		"Content-Security-Policy",
		contentSecurityPolicyHeaderValue,
	);

	const { nextUrl } = request;
	const auth = request.auth;
	const isLoggedIn = !!auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) return response;

	if (isAuthRoute) {
		if (isLoggedIn)
			return Response.redirect(new URL(DEFAULT_SIGN_IN_REDIRECT, nextUrl));
		return response;
	}

	if (!isLoggedIn && !isPublicRoute)
		return Response.redirect(new URL("/auth", nextUrl));

	return response;
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
	missing: [
		{ type: "header", key: "next-router-prefetch" },
		{ type: "header", key: "purpose", value: "prefetch" },
	],
};
