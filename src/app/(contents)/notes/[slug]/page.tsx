import { Header } from "@/components/nav/header";
import { Unauthorized } from "@/components/unauthorized";
import { MARKDOWN_PATHS, PAGE_NAME } from "@/constants";
import { checkSelfAuthOrRedirectToAuth } from "@/features/auth/utils/get-session";
import { checkAdminPermission } from "@/features/auth/utils/role";
import {
	/*getAllSlugs,*/ getContentsBySlug,
} from "@/features/markdown/actions/fetch-contents";
import { ContentBody } from "@/features/markdown/components/content-body";
import type { ContentsType } from "@/features/markdown/types";
import { markdownToReact } from "@/features/markdown/utils/markdownToReact";
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
	await checkSelfAuthOrRedirectToAuth();

	const hasAdminPermission = await checkAdminPermission();

	const slug = params.slug; // MEMO: no need to decode due to english file name
	const content = getContentsBySlug(slug, `${MARKDOWN_PATHS}/${path}`);
	const reactContent = await markdownToReact(content);

	return (
		<>
			<Header title={slug} />
			{hasAdminPermission ? (
				<ContentBody content={reactContent} />
			) : (
				<Unauthorized />
			)}
		</>
	);
}

// export function generateStaticParams() {
// 	return getAllSlugs(path);
// }
