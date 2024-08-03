import { join } from "node:path";
import { Header } from "@/components/nav/header";
import { ContentsStack } from "@/features/contents/components/contents-stack";
import { getAllSlugs } from "@/features/contents/utils/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Notes | Contents",
	description: "Private notes",
};

export default function Page() {
	const slugs = getAllSlugs("thoughts").map((slug) => join("notes", slug));

	return (
		<>
			<Header title="Notes" />
			{/* FIXME: noImage true to false */}
			<ContentsStack slugs={slugs} noImage={true} />
		</>
	);
}
