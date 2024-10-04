import { env } from "@/env.mjs";
// import { signInSchema } from "@/features/auth/schemas/sign-in-schema";
// import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";

// TODO: https://qiita.com/daiki7010/items/b15de9ef747f5b23c984
export const authConfig: NextAuthConfig = {
	secret: env.AUTH_SECRET,
	providers: [
		// MEMO: for manual auth
		// Credentials({
		// 	/*async*/ authorize(credentials) {
		// 		const parsedCredentials = signInSchema.safeParse(credentials);
		// 		if (parsedCredentials.success) {
		// 			const { email, password } = parsedCredentials.data;
		// 			const allowedEmail = env.ALLOWED_EMAIL;
		// 			const allowedPassword = env.ALLOWED_HASHED_PASSWORD;
		// 			const emailMatch = email === allowedEmail;
		// 			if (!emailMatch) return null;
		// 			const passwordMatch = password === allowedPassword;
		// 			// const passwordMatch = await bcrypt.compare(password, allowedPassword);
		// 			if (!passwordMatch) return null;
		// 			return { email: email };
		// 		}
		// 		return null;
		// 	},
		// }),
		// MEMO: for GitHub Provider
		// GitHubProvider({
		// 	clientId: env.GITHUB_CLIENT_ID,
		// 	clientSecret: env.GITHUB_CLIENT_SECRET,
		// }),
	],
};
