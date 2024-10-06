import { env } from "@/env.mjs";
import { signInSchema } from "@/features/auth/schemas/sign-in-schema";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";

// TODO: https://qiita.com/daiki7010/items/b15de9ef747f5b23c984
export const authConfig: NextAuthConfig = {
	secret: env.AUTH_SECRET,
	providers: [
		// MEMO: for manual auth
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = signInSchema.safeParse(credentials);
				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;

					const user = await prisma.users.findUnique({
						where: { email },
						// MEMO: only allowed to select password here (for auth). See `src/prisma.ts` for more.
						select: { id: true, email: true, password: true },
					});
					if (!user) return null;
					const passwordMatch = await bcrypt.compare(password, user.password);
					if (!passwordMatch) return null;

					return { id: user.id };
				}
				return null;
			},
		}),
		// MEMO: for GitHub Provider
		// GitHubProvider({
		// 	clientId: env.GITHUB_CLIENT_ID,
		// 	clientSecret: env.GITHUB_CLIENT_SECRET,
		// }),
	],
};
