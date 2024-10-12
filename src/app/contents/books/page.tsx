import { getAllImages, getAllSlugs } from "@/apis/markdown/fetch-contents";
import { Header } from "@/components/nav/header";
import { Badge } from "@/components/ui/badge";
import { Unauthorized } from "@/components/unauthorized";
import { PAGE_NAME } from "@/constants";
import { checkAdminPermission } from "@/features/auth/utils/role";
import { ContentsStack } from "@/features/contents/components/contents-stack";
import { formatSlugsAndImages } from "@/features/contents/utils/format";
import type { Metadata } from "next";

const path = "books";
const displayName = "本の要約";

export const metadata: Metadata = {
	title: `${displayName} | ${PAGE_NAME}`,
	description: "Private book reviews",
};

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	const slugs = getAllSlugs("books");
	const images = getAllImages("books");

	return (
		<>
			<Header title={displayName} />
			{hasAdminPermission ? (
				<>
					<Badge className="m-2 flex justify-center">
						冊数: {slugs.length}
					</Badge>
					<ContentsStack
						path={path}
						data={formatSlugsAndImages(slugs, images)}
					/>
				</>
			) : (
				<Unauthorized />
			)}
		</>
	);
}
