import type { createSelfContents } from "@/apis/prisma/fetch-contents";
import type { createSelfNews } from "@/apis/prisma/fetch-news";
import type { ContentName } from "@/features/dump/types";
import type { ProfileSchema } from "@/features/profile/schemas/profile-schema";
import type { Status } from "@/features/update-status/types";
import type { UnwrapPromise } from "@/types";
import type { Role, Scope } from "@prisma/client";

export function formatChangeStatusMessage(
	status: Status,
	contentName: ContentName,
) {
	return `【${contentName}】\n\n更新\n未処理: ${status.unexported}\n直近更新: ${status.recentlyUpdated}\n確定: ${status.exported}`;
}

export function formatCreateCategoryMessage(
	category: string,
	contentName: ContentName,
) {
	return `【${contentName}】\n\nカテゴリー\n${category}\nの登録ができました`;
}

export function formatCreateNewsMessage({
	title,
	quote,
	url,
	Category,
}: UnwrapPromise<ReturnType<typeof createSelfNews>>) {
	return `【NEWS】\n\nコンテンツ\ntitle: ${title} \nquote: ${quote} \nurl: ${url}\ncategory: ${Category.name}\nの登録ができました`;
}

export function formatCreateContentsMessage({
	title,
	quote,
	url,
}: UnwrapPromise<ReturnType<typeof createSelfContents>>) {
	return `【CONTENTS】\n\nコンテンツ\ntitle: ${title} \nquote: ${quote} \nurl: ${url}\nの登録ができました`;
}

export function formatUpdateScopeMessage(scope: Scope) {
	return `【SCOPE】\n\nscope: ${scope}\nに変更しました`;
}

export function formatUpsertProfileMessage(data: ProfileSchema) {
	return `【PROFILE】\n\nname: ${data.name}\nに変更しました`;
}

export function formatUpdateRoleMessage(role: Role) {
	return `【ROLE】\n\nrole: ${role}\nに変更しました`;
}
