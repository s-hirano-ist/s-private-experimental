import { Header } from "@/components/nav/header";
import { Badge } from "@/components/ui/badge";
import { ContentsStack } from "@/features/contents/components/contents-stack";
import { getAllImages, getAllSlugs } from "@/features/contents/utils/api";
import { formatSlugsAndImages } from "@/features/contents/utils/format";
import type { Metadata } from "next";

const path = "books";
const displayName = "Book reviews";

export const metadata: Metadata = {
	title: `${displayName} | Contents`,
	description: "Private book reviews",
};

export default function Page() {
	const slugs = getAllSlugs("books");
	const images = getAllImages("books");

	return (
		<>
			<Header title={displayName} />
			<Badge className="m-2 flex justify-center">冊数: {slugs.length}</Badge>
			<ContentsStack path={path} data={formatSlugsAndImages(slugs, images)} />
		</>
	);
}
