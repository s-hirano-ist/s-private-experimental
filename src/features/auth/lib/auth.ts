import prisma from "@/server/db";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth({
	...authConfig,
	session: { strategy: "jwt" },
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			// ログイン成功時の処理
			console.log("signin");
			// const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
			// const userAgent = req.headers["user-agent"] || "";
			return true;
		},
		async jwt({ token, user }) {
			if (user) token.user = user;

			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
});
