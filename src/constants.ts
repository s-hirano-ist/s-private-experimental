export const PAGE_NAME = "s-private";

export const FORM_ERROR_MESSAGES = {
	REQUIRED: "必須項目です。",
	TOO_LONG: "文字数が多すぎます。",
	INVALID_FORMAT: "無効なフォーマットで入力されています。",
} as const;

export const ERROR_MESSAGES = {
	UNEXPECTED: "予期せぬエラーが発生しました。",
	LINE_SEND: "ログの送信でエラーが発生しました。",
	PRISMA_WRITE: "データベースへの書き込み時にエラーが発生しました。",
	UNAUTHORIZED: "認証されていません。",
	SIGN_IN: "メールアドレスまたはパスワードが間違っています。",
	SIGN_IN_UNKNOWN: "サインインに失敗しました。",
	SIGN_OUT_UNKNOWN: "サインアウトに失敗しました。",
} as const;

export const SUCCESS_MESSAGES = {
	INSERT: "正常に登録できました。",
	SIGN_IN: "サインインに成功しました。",
	SIGN_OUT: "サインアウトに成功しました。",
} as const;

export const LOADING_STACK_SIZE = 32;
export const LOADING_TABLE_ROWS = 5;

export const MARKDOWN_PATHS = "s-contents/markdown";

export const DEFAULT_SIGN_IN_REDIRECT = "/dump/news";
