import type { Status } from "@/types/status";
import { describe, expect, it } from "vitest";
import {
	formatChangeStatusMessage,
	formatCreateCategoryMessage,
	formatCreateContentsMessage,
	formatCreateNewsMessage,
} from "./format-for-line";

describe("formatChangeStatusMessage", () => {
	it("should format the change status message correctly", () => {
		const changeStatus: Status = {
			unexported: 5,
			recentlyUpdated: 3,
			exported: 7,
		};
		const contentName = "NEWS";

		const result = formatChangeStatusMessage(changeStatus, contentName);

		expect(result).toBe("**NEWS**\n\n更新\n未処理: 5\n直近更新: 3\n確定: 7");
	});
});

describe("formatCreateCategoryMessage", () => {
	it("should format the create category message correctly", () => {
		const category = "新しいカテゴリー";
		const contentName = "NEWS";

		const result = formatCreateCategoryMessage(category, contentName);

		expect(result).toBe(
			"**NEWS**\n\nカテゴリー\n新しいカテゴリー\nの登録ができました",
		);
	});
});

describe("formatCreateContentsMessage", () => {
	it("should format the create news message correctly", () => {
		const title = "新しいニュース";
		const quote = "これは引用です";
		const url = "https://example.com";
		const category = "カテゴリー";

		const result = formatCreateNewsMessage(title, quote, url, "NEWS", category);

		expect(result).toBe(
			"**NEWS**\n\nコンテンツ\ntitle: 新しいニュース \nquote: これは引用です \nurl: https://example.com\ncategory: カテゴリー\nの登録ができました",
		);
	});

	it("should format the create contents message correctly", () => {
		const title = "新しいニュース";
		const quote = "これは引用です";
		const url = "https://example.com";

		const result = formatCreateContentsMessage(title, quote, url, "CONTENTS");

		expect(result).toBe(
			"**CONTENTS**\n\nコンテンツ\ntitle: 新しいニュース \nquote: これは引用です \nurl: https://example.com\nの登録ができました",
		);
	});
});
