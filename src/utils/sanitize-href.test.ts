import { describe, expect, it } from "vitest";
import { sanitizeHref } from "./sanitize-href";

describe("sanitizeHref", () => {
	it("should return the URL when it is an HTTP URL", () => {
		const url = "http://example.com";
		const result = sanitizeHref(url);
		expect(result).toBe(url);
	});

	it("should return the URL when it is an HTTPS URL", () => {
		const url = "https://example.com";
		const result = sanitizeHref(url);
		expect(result).toBe(url);
	});

	it("should throw an error for non-HTTP/HTTPS protocols", () => {
		const url = "ftp://example.com";
		expect(() => sanitizeHref(url)).toThrowError(
			"Detected url which is not HTTPS",
		);
	});

	it("should throw an error for invalid URLs", () => {
		const url = "invalid-url";
		expect(() => sanitizeHref(url)).toThrowError();
	});
});
