import { Header } from "@/components/nav/header";
import { PAGE_NAME } from "@/constants";
import { checkSelfAuth, getUserId } from "@/features/auth/utils/get-session";
import { ScopeUpdateSwitch } from "@/features/profile/components/scope-update-switch";
import { UpsertProfileForm } from "@/features/profile/components/upsert-profile-form";
import prisma from "@/prisma";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: `MY PROFILE | ${PAGE_NAME}`,
	description: "My profile",
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
	const session = await checkSelfAuth();
	const profile = await getSelfProfile();
	const scope = await getSelfScope();

	return (
		<>
			<Header title={`Profile of ${session.user.username}`} />
			<div className="space-y-4 px-2 sm:px-0">
				<UpsertProfileForm defaultValues={profile} />
				<ScopeUpdateSwitch scope={scope} />
			</div>
		</>
	);
}
