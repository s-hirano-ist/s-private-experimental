import { Header } from "@/components/nav/header";
import { PAGE_NAME } from "@/constants";
import {
	checkSelfAuthOrRedirectToAuth,
	getUserId,
} from "@/features/auth/utils/get-session";
import { ScopeUpdateSwitch } from "@/features/profile/components/scope-update-switch";
import { UpsertProfileForm } from "@/features/profile/components/upsert-profile-form";
import prisma from "@/prisma";
import type { Metadata } from "next";

const displayName = "PROFILE";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `${displayName} | ${PAGE_NAME}`,
	description: "My profile.",
};

async function getSelfProfile() {
	const userId = await getUserId();

	const profile = await prisma.profiles.findUnique({
		where: { userId },
		select: { name: true, bio: true, avatarUrl: true },
	});
	if (!profile) return undefined;
	return {
		name: profile.name,
		bio: profile.bio ?? undefined,
		avatarUrl: profile.avatarUrl ?? undefined,
	};
}

// SELF
async function getSelfScope() {
	const userId = await getUserId();
	const user = await prisma.users.findUniqueOrThrow({
		where: { id: userId },
		select: { scope: true },
	});
	return user.scope;
}

export default async function Page() {
	await checkSelfAuthOrRedirectToAuth();
	const profile = await getSelfProfile();
	const scope = await getSelfScope();

	return (
		<>
			<Header title={displayName} />
			<div className="mx-auto max-w-5xl space-y-4 px-2">
				<UpsertProfileForm defaultValues={profile} />
				<ScopeUpdateSwitch scope={scope} />
			</div>
		</>
	);
}
