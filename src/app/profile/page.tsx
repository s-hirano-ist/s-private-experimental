import { getScope } from "@/apis/prisma/fetch-user";
import { Header } from "@/components/nav/header";
import { PAGE_NAME } from "@/constants";
import { getProfile } from "@/features/auth/utils/profile";
import { checkAuth } from "@/features/auth/utils/role";
import { ProfileUpsertForm } from "@/features/profile/components/profile-upsert-form";
import { ScopeUpdateSwitch } from "@/features/profile/components/scope-update-switch";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `MY PROFILE | ${PAGE_NAME}`,
	description: "My profile",
};

export default async function Page() {
	const session = await checkAuth();
	const profile = await getProfile();
	const scope = await getScope();

	return (
		<>
			<Header title={`Profile of ${session.user.username}`} />
			<div className="space-y-4 p-4">
				<ProfileUpsertForm defaultValues={profile} />
				<ScopeUpdateSwitch scope={scope} />
			</div>
		</>
	);
}
