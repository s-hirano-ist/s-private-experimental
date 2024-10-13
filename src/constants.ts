export const PAGE_NAME = "private.s-hirano.com";

export const FORM_ERROR_MESSAGES = {
	REQUIRED: "必須項目です。",
	TOO_LONG: "文字数が多すぎます。",
	ALPHABET_ONLY: "アルファベットとハイフンのみが入力可能です。",
	INVALID_FORMAT: "無効なフォーマットで入力されています。",
} as const;

export const ERROR_MESSAGES = {
	UNEXPECTED: "予期せぬエラーが発生しました。",
	LINE_SEND: "ログの送信でエラーが発生しました。",
	PRISMA_DUPLICATE: "すでに登録されているため登録できません。",
	PRISMA_UNEXPECTED: "データベースへの書き込み時にエラーが発生しました。",
	UNAUTHORIZED: "認証されていません。",
	NOT_ALLOWED: "操作が許可されていません。",
	SIGN_IN: "メールアドレスまたはパスワードが間違っています。",
	SIGN_IN_UNKNOWN: "サインインに失敗しました。",
	SIGN_OUT_UNKNOWN: "サインアウトに失敗しました。",
} as const;

export const SUCCESS_MESSAGES = {
	INSERTED: "正常に登録できました。",
	SCOPE_UPDATED: "スコープを正常に変更しました。",
	PROFILE_UPSERTED: "プロフィールを更新しました。",
	SIGN_IN: "サインインに成功しました。",
	SIGN_OUT: "サインアウトに成功しました。",
	UPDATE: "更新が完了しました。",
} as const;

export const LOADING_STACK_SIZE = 32;
export const LOADING_TABLE_ROWS = 5;

export const MARKDOWN_PATHS = "s-contents/markdown";

export const DEFAULT_SIGN_IN_REDIRECT = "/";
