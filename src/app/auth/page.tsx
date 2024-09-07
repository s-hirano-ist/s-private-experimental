import { Header } from "@/components/nav/header";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import type { Metadata } from "next";

const displayName = "サインイン";

export const metadata: Metadata = {
	title: `${displayName}`,
	description: "Sign in",
};

export default function Page() {
	return (
		<div className="space-y-2">
			<Header title="サインイン" />
			<div className="mx-auto max-w-screen-sm pt-4">
				<SignInForm />
			</div>
		</div>
	);
}
