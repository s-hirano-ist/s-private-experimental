import type { Role } from "@prisma/client";
// import { Session } from "@auth/core";
import NextAuth, { type DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";

declare module "next-auth" {
	// eslint-disable-next-line
	interface Session extends DefaultSession {
		user: {
			id: string;
			role: string;
		} & DefaultSession["user"];
	}
	// eslint-disable-next-line
	interface User {
		role: Role;
	}
}

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth({
	...authConfig,
	session: { strategy: "jwt" },
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.role = token.role as Role;
			}
			return session;
		},
	},
});
