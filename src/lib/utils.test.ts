import type { ClassValue } from "clsx";
import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
	it("should merge class names correctly", () => {
		const class1: ClassValue = "bg-red-500";
		const class2: ClassValue = "text-white";
		const class3: ClassValue = "bg-red-500"; // 重複したクラス

		const result = cn(class1, class2, class3);

		expect(result).toBe("text-white bg-red-500");
	});

	it("should handle conditional class names", () => {
		const class1: ClassValue = "bg-red-500";
		const class2: ClassValue = false;
		const class3: ClassValue = "text-white";

		const result = cn(class1, class2, class3);

		expect(result).toBe("bg-red-500 text-white");
	});

	it("should handle array of class names", () => {
		const class1: ClassValue = ["bg-red-500", "text-white"];
		const class2: ClassValue = "font-bold";

		const result = cn(class1, class2);

		expect(result).toBe("bg-red-500 text-white font-bold");
	});
});
