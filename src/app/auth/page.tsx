import { Header } from "@/components/nav/header";
import { PAGE_NAME } from "@/constants";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import type { Metadata } from "next";

const displayName = "サインイン";

export const metadata: Metadata = {
	title: `${displayName} | ${PAGE_NAME} `,
	description: `Sign in page of ${PAGE_NAME}`,
};

export default function Page() {
	return (
		<div className="space-y-2">
			<Header title="サインイン" />
			<div className="mx-auto max-w-screen-sm px-2 pt-4 sm:px-0">
				<SignInForm />
			</div>
		</div>
	);
}
