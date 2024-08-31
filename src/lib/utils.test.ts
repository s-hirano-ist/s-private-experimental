import type { ClassValue } from "clsx";
import { describe, expect, it } from "vitest";
import { cn, sleep } from "./utils";

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

describe("sleep", () => {
	it("should resolve after the specified time", async () => {
		const start = Date.now();
		const duration = 100; // 100 milliseconds

		await sleep(duration);

		const end = Date.now();
		const elapsed = end - start;

		// Allow a small margin of error for the timing
		expect(elapsed).toBeGreaterThanOrEqual(duration);
		expect(elapsed).toBeLessThan(duration + 5000);
	});
});
