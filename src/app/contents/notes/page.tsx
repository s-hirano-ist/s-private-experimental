import { Header } from "@/components/nav/header";
import { Unauthorized } from "@/components/unauthorized";
import { PAGE_NAME } from "@/constants";
import { checkAdminPermission } from "@/features/auth/lib/role";
import { ContentsStack } from "@/features/contents/components/contents-stack";
import { getAllImages, getAllSlugs } from "@/features/contents/utils/api";
import { formatSlugsAndImages } from "@/features/contents/utils/format";
import type { Metadata } from "next";

const path = "notes";
const displayName = "メモ";

export const metadata: Metadata = {
	title: `${displayName} | ${PAGE_NAME}`,
	description: "Private notes",
};

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	const slugs = getAllSlugs(path);
	const images = getAllImages(path);

	return (
		<>
			<Header title={displayName} />
			{hasAdminPermission ? (
				<ContentsStack path={path} data={formatSlugsAndImages(slugs, images)} />
			) : (
				<Unauthorized />
			)}
		</>
	);
}
