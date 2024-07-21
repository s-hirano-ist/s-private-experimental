import { auth } from "@/features/auth/lib/auth";
import { env } from "./env.mjs";

export default auth(async (request) => {
	const { nextUrl } = request;
	const auth = request.auth;
	const isLoggedIn = !!auth;
	if (!isLoggedIn) return Response.redirect(new URL("/api/github", nextUrl));

	const userEmail = auth.user?.email;
	const unauthorizedUrl = new URL("/unauthorized", nextUrl);

	if (
		userEmail !== env.ALLOWED_GITHUB_ACCOUNT_EMAIL &&
		request.url !== unauthorizedUrl.toString()
	)
		return Response.redirect(unauthorizedUrl);
	if (
		userEmail === env.ALLOWED_GITHUB_ACCOUNT_EMAIL &&
		request.url === unauthorizedUrl.toString()
	)
		return Response.redirect(new URL("/", nextUrl));
});

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
