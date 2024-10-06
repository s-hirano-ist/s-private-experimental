import type { postContents } from "@/apis/prisma/fetch-contents";
import type { postNews } from "@/apis/prisma/fetch-news";
import type { ContentName } from "@/types/content-name";
import type { Status } from "@/types/status";
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export function formatChangeStatusMessage(
	status: Status,
	contentName: ContentName,
) {
	return `**${contentName}**\n\n更新\n未処理: ${status.unexported}\n直近更新: ${status.recentlyUpdated}\n確定: ${status.exported}`;
}

export function formatCreateCategoryMessage(
	category: string,
	contentName: ContentName,
) {
	return `**${contentName}**\n\nカテゴリー\n${category}\nの登録ができました`;
}

export function formatCreateNewsMessage({
	title,
	quote,
	url,
	category,
}: UnwrapPromise<ReturnType<typeof postNews>>) {
	return `**【NEWS】**\n\nコンテンツ\ntitle: ${title} \nquote: ${quote} \nurl: ${url}\ncategory: ${category.name}\nの登録ができました`;
}

export function formatCreateContentsMessage({
	title,
	quote,
	url,
}: UnwrapPromise<ReturnType<typeof postContents>>) {
	return `**【CONTENTS】**\n\nコンテンツ\ntitle: ${title} \nquote: ${quote} \nurl: ${url}\nの登録ができました`;
}
