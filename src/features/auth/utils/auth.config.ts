import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";

export default {
	providers: [Credentials /*GitHubProvider*/],
} satisfies NextAuthConfig;
