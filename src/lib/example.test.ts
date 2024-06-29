import { describe, expect, test } from "vitest";
import { sum } from "./example";

describe("example of test", () => {
	test("1 + 2 should return 3", () => {
		expect(sum(1, 2)).toBe(3);
	});
	test("-100 + 200 should return 100", () => {
		expect(sum(-100, 200)).toBe(100);
	});
});
