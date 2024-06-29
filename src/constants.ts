export const FORM_ERROR_MESSAGES = {
	REQUIRED: "必須項目です。",
	TOO_LONG: "文字数が多すぎます。",
	INVALID_FORMAT: "無効なフォーマットで入力されています。",
} as const;

export const ERROR_MESSAGES = {
	UNEXPECTED: "予期せぬエラーが発生しました。",
	LINE_SEND: "ログの送信でエラーが発生しました。",
	PRISMA_WRITE: "データベースへの書き込み時にエラーが発生しました。",
} as const;

export const SUCCESS_MESSAGES = {
	SUCCESS: "正常に登録できました。",
} as const;
