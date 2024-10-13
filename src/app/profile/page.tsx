import { getSelfProfile } from "@/apis/prisma/fetch-profile";
import { getSelfScope } from "@/apis/prisma/fetch-user";
import { Header } from "@/components/nav/header";
import { PAGE_NAME } from "@/constants";
import { checkSelfAuth } from "@/features/auth/utils/get-session";
import { ScopeUpdateSwitch } from "@/features/profile/components/scope-update-switch";
import { UpsertProfileForm } from "@/features/profile/components/upsert-profile-form";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `MY PROFILE | ${PAGE_NAME}`,
	description: "My profile",
};

export default async function Page() {
	const session = await checkSelfAuth();
	const profile = await getSelfProfile();
	const scope = await getSelfScope();

	return (
		<>
			<Header title={`Profile of ${session.user.username}`} />
			<div className="space-y-4 p-4">
				<UpsertProfileForm defaultValues={profile} />
				<ScopeUpdateSwitch scope={scope} />
			</div>
		</>
	);
}
