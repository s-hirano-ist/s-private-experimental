import { FORM_ERROR_MESSAGES } from "@/constants";
import { describe, expect, it } from "vitest";
import { profileSchema } from "./profile-schema";

describe("profileSchema", () => {
	it("should validate correct profile data", () => {
		const validData = {
			name: "John Doe",
			bio: "This is a bio with less than 256 characters.",
			avatarUrl: "https://example.com/avatar.png",
		};

		const result = profileSchema.safeParse(validData);
		expect(result.success).toBe(true);
	});

	it("should fail when name is empty", () => {
		const invalidData = {
			name: "",
			bio: "This is a bio with less than 256 characters.",
			avatarUrl: "https://example.com/avatar.png",
		};

		const result = profileSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.errors[0].message).toBe(FORM_ERROR_MESSAGES.REQUIRED);
		}
	});

	it("should fail when name exceeds max length", () => {
		const invalidData = {
			name: "a".repeat(33),
			bio: "This is a bio with less than 256 characters.",
			avatarUrl: "https://example.com/avatar.png",
		};

		const result = profileSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.errors[0].message).toBe(FORM_ERROR_MESSAGES.TOO_LONG);
		}
	});

	it("should fail when bio exceeds max length", () => {
		const invalidData = {
			name: "John Doe",
			bio: "a".repeat(257),
			avatarUrl: "https://example.com/avatar.png",
		};

		const result = profileSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.errors[0].message).toBe(FORM_ERROR_MESSAGES.TOO_LONG);
		}
	});

	it("should fail when avatarUrl is not a valid URL", () => {
		const invalidData = {
			name: "John Doe",
			bio: "This is a bio with less than 256 characters.",
			avatarUrl: "invalid-url",
		};

		const result = profileSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.errors[0].message).toBe("Invalid url");
		}
	});

	it("should validate when optional fields are missing", () => {
		const validData = {
			name: "John Doe",
		};

		const result = profileSchema.safeParse(validData);
		expect(result.success).toBe(true);
	});
});
