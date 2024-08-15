import { Header } from "@/components/nav/header";
import { MARKDOWN_PATHS } from "@/constants";
import ContentsBody from "@/features/contents/components/contents-body";
import type ContentsType from "@/features/contents/types/contents";
import { getAllSlugs, getContentsBySlug } from "@/features/contents/utils/api";
import markdownToHtml from "@/features/contents/utils/markdownToHtml";
import type { Metadata } from "next";

const path = "notes";

type Props = { params: ContentsType };

export function generateMetadata({ params }: Props): Metadata {
	return { title: `Notes | ${params.slug}` };
}

export default async function Page({ params }: Props) {
	const { slug } = params;
	const slugs = getContentsBySlug(slug, `${MARKDOWN_PATHS}/${path}`);
	const content = await markdownToHtml(slugs);

	return (
		<>
			<Header title={slug} />
			<ContentsBody content={content} />
		</>
	);
}

export function generateStaticParams() {
	return getAllSlugs(path);
}
