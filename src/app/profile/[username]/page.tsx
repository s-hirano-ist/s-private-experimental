import { Header } from "@/components/nav/header";
import { NotFound } from "@/components/not-found";
import { LoadingStack } from "@/components/stack/loading-stack";
import { Separator } from "@/components/ui/separator";
import { Unauthorized } from "@/components/unauthorized";
import { PAGE_NAME } from "@/constants";
import { checkViewStatus } from "@/features/auth/utils/role";
import { ContentsContents } from "@/features/dump/components/contents-contents";
import { NewsContents } from "@/features/dump/components/news-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type Props = { params: { username: string } };

export function generateMetadata({ params }: Props): Metadata {
	return {
		title: `${params.username} | DUMPED NEWS & CONTENTS | ${PAGE_NAME}`,
		description: "Dumped contents data to GitHub",
	};
}

export default async function Page({ params }: Props) {
	const viewStatus = await checkViewStatus(params.username);

	return (
		<>
			<Header title={`Profile of ${params.username}`} />
			{/* TODO: profileを追加 */}
			{viewStatus === "PROHIBITED" && <Unauthorized />}
			{viewStatus === "NOT_FOUND" && <NotFound />}
			{viewStatus === "VIEW_ONLY" && (
				<>
					{/* TODO: タイトル追加 */}
					<p className="font-bold px-6 pt-2 text-primary">NEWS</p>
					<Suspense fallback={<LoadingStack />}>
						<NewsContents />
					</Suspense>
					<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
					<p className="font-bold px-6 pt-2 text-primary">NOTES</p>
					<Suspense fallback={<LoadingStack />}>
						<ContentsContents />
					</Suspense>
					<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
				</>
			)}
		</>
	);
}
