import { join } from "node:path";
import { Header } from "@/components/nav/header";
import ContentsBody from "@/features/contents/components/contents-body";
import type ContentsType from "@/features/contents/types/contents";
import { getAllSlugs, getContentsBySlug } from "@/features/contents/utils/api";
import markdownToHtml from "@/features/contents/utils/markdownToHtml";
import type { Metadata } from "next";

// FIXME: thoughtsとnotesを統一する
const path = "thoughts";

export const dynamicParams = false;

type Props = { params: ContentsType };

export function generateMetadata({ params }: Props): Metadata {
	return { title: `Notes | ${params.slug}` };
}

export default async function Contents({ params }: Props) {
	const { slug } = params;

	const content = await markdownToHtml(
		getContentsBySlug(slug, `s-contents/_markdown/${path}`) || "",
	);
	return (
		<>
			<Header title={join("notes", slug)} />
			<ContentsBody content={content} />
		</>
	);
}

export function generateStaticParams() {
	return getAllSlugs(path);
}
