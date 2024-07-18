import type { ContentName } from "@/types/content-name";
import type { Status } from "@/types/status";

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

export function formatCreateContentMessage(
	title: string,
	quote: string,
	url: string,
	contentName: ContentName,
	category?: string,
) {
	const categoryString = category ? `\ncategory: ${category}` : "";
	return `**${contentName}**\n\nコンテンツ\ntitle: ${title} \nquote: ${quote} \nurl: ${url}${categoryString}\nの登録ができました`;
}
