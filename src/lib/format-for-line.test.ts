import type { ChangeStatus } from "@/apis/prisma/change-status";
import { describe, expect, it } from "vitest";
import {
	formatChangeStatusMessage,
	formatCreateCategoryMessage,
	formatCreateNewsDetailMessage,
} from "./format-for-line";

describe("formatChangeStatusMessage", () => {
	it("should format the change status message correctly", () => {
		const changeStatus: ChangeStatus = {
			unexported: 5,
			recentlyUpdated: 3,
			exported: 7,
		};

		const result = formatChangeStatusMessage(changeStatus);

		expect(result).toBe("更新\n未処理: 5\n直近更新: 3\n確定: 7");
	});
});

describe("formatCreateCategoryMessage", () => {
	it("should format the create category message correctly", () => {
		const category = "新しいカテゴリー";

		const result = formatCreateCategoryMessage(category);

		expect(result).toBe("カテゴリー\n新しいカテゴリー\nの登録ができました");
	});
});

describe("formatCreateNewsDetailMessage", () => {
	it("should format the create news detail message correctly", () => {
		const title = "新しいニュース";
		const quote = "これは引用です";
		const url = "https://example.com";

		const result = formatCreateNewsDetailMessage(title, quote, url);

		expect(result).toBe(
			"コンテンツ\ntitle: 新しいニュース \nquote: これは引用です \nurl: https://example.com\nの登録ができました",
		);
	});
});
