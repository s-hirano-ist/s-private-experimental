import { Header } from "@/components/nav/header";
import { NotFound } from "@/components/not-found";
import { StackSkeleton } from "@/components/stack/stack-skeleton";
import { Separator } from "@/components/ui/separator";
import { Unauthorized } from "@/components/unauthorized";
import { PAGE_NAME } from "@/constants";
import { checkViewStatus } from "@/features/auth/utils/role";
import { Profile } from "@/features/profile/components/profile";
import { ProfileContents } from "@/features/profile/components/profile-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type Props = { params: { username: string } };

export function generateMetadata({ params }: Props): Metadata {
	return {
		title: `${params.username} | PROFILE | ${PAGE_NAME}`,
		description: "Dumped news and contents data to GitHub",
	};
}

export default async function Page({ params }: Props) {
	const viewStatus = await checkViewStatus(params.username);
	const username = params.username;

	return (
		<>
			<Header title={`Profile of ${params.username}`} />
			<div className="mx-auto max-w-5xl  sm:px-2">
				{viewStatus !== "NOT_FOUND" && <Profile username={username} />}
				{viewStatus === "PROHIBITED" && <Unauthorized />}
				{viewStatus === "NOT_FOUND" && <NotFound />}
				{viewStatus === "VIEW_ONLY" && (
					<Suspense fallback={<StackSkeleton />}>
						<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />

						<ProfileContents username={username} />
					</Suspense>
				)}
			</div>
		</>
	);
}
