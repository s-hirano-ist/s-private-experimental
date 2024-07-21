import { env } from "@/env.mjs";
import type { NextAuthConfig, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authConfig: NextAuthConfig = {
	secret: env.AUTH_SECRET,
	providers: [
		GitHubProvider({
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		}),
	],
};
