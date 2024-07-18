import type { Contents } from "@/types/contents";
import type { Status } from "@/types/status";

export function formatChangeStatusMessage({
	unexported,
	recentlyUpdated,
	exported,
}: Status) {
	return `更新\n未処理: ${unexported}\n直近更新: ${recentlyUpdated}\n確定: ${exported}`;
}

export function formatCreateCategoryMessage(category: string) {
	return `カテゴリー\n${category}\nの登録ができました`;
}

export function formatCreateContentMessage(
	title: string,
	quote: string,
	url: string,
	contentName: Contents,
	category?: string,
) {
	const categoryString = category ? `\ncategory: ${category}` : "";
	return `**${contentName}**\n\nコンテンツ\ntitle: ${title} \nquote: ${quote} \nurl: ${url}${categoryString}\nの登録ができました`;
}
