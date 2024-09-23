import { Header } from "@/components/nav/header";
import { MARKDOWN_PATHS, PAGE_NAME } from "@/constants";
import ContentsBody from "@/features/contents/components/contents-body";
import type ContentsType from "@/features/contents/types/contents";
import { getAllSlugs, getContentsBySlug } from "@/features/contents/utils/api";
import { markdownToReact } from "@/features/contents/utils/markdownToReact";
import type { Metadata } from "next";

const path = "notes";

export const dynamicParams = true; // FIXME: #278

type Props = { params: ContentsType };

export function generateMetadata({ params }: Props): Metadata {
	return {
		title: `${params.slug} | ${PAGE_NAME}`,
		description: `Private notes of ${params.slug}`,
	};
}

export default async function Page({ params }: Props) {
	const { slug } = params;
	const content = getContentsBySlug(slug, `${MARKDOWN_PATHS}/${path}`);
	const reactContent = await markdownToReact(content);

	return (
		<>
			<Header title={slug} />
			<ContentsBody content={reactContent} />
		</>
	);
}

export function generateStaticParams() {
	return getAllSlugs(path);
}
