import { describe, expect, it } from "vitest";
import { sanitizeFileName } from "./sanitize-file-name";

describe("sanitizeFileName", () => {
	it("should remove invalid characters from the file name", () => {
		const fileName = "test*file:name?.txt";
		const sanitized = sanitizeFileName(fileName);
		expect(sanitized).toBe("testfilename.txt");
	});

	it("should allow valid characters", () => {
		const fileName = "valid-file_name123.txt";
		const sanitized = sanitizeFileName(fileName);
		expect(sanitized).toBe(fileName);
	});

	it("should return an empty string if fileName contains only invalid characters", () => {
		const fileName = "****????";
		const sanitized = sanitizeFileName(fileName);
		expect(sanitized).toBe("");
	});

	it("should handle empty file names", () => {
		const fileName = "";
		const sanitized = sanitizeFileName(fileName);
		expect(sanitized).toBe("");
	});

	it("should handle file names with no invalid characters", () => {
		const fileName = "simplefile.txt";
		const sanitized = sanitizeFileName(fileName);
		expect(sanitized).toBe(fileName);
	});
});
