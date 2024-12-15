import { FORM_ERROR_MESSAGES } from "@/constants";
import { describe, expect, it } from "vitest";
import { signInSchema } from "./sign-in-schema";

describe("signInSchema", () => {
	it("should validate successfully for valid input", () => {
		const validInput = {
			username: "Valid-Username",
			password: "ValidPassword123",
		};

		expect(() => signInSchema.parse(validInput)).not.toThrow();
	});

	it("should throw an error if username is empty", () => {
		const invalidInput = {
			username: "",
			password: "ValidPassword123",
		};

		try {
			signInSchema.parse(invalidInput);
			// biome-ignore lint: for test
		} catch (error: any) {
			expect(error.errors[0].message).toBe(FORM_ERROR_MESSAGES.REQUIRED);
		}
	});

	it("should throw an error if username contains invalid characters", () => {
		const invalidInput = {
			username: "Invalid_Username123",
			password: "ValidPassword123",
		};

		try {
			signInSchema.parse(invalidInput);
			// biome-ignore lint: for test
		} catch (error: any) {
			expect(error.errors[0].message).toBe(FORM_ERROR_MESSAGES.ALPHABET_ONLY);
		}
	});

	it("should throw an error if username is too long", () => {
		const invalidInput = {
			username: "A".repeat(33), // 33 characters
			password: "ValidPassword123",
		};

		try {
			signInSchema.parse(invalidInput);
			// biome-ignore lint: for test
		} catch (error: any) {
			expect(error.errors[0].message).toBe(FORM_ERROR_MESSAGES.TOO_LONG);
		}
	});

	it("should throw an error if password is empty", () => {
		const invalidInput = {
			username: "Valid-Username",
			password: "",
		};

		try {
			signInSchema.parse(invalidInput);
			// biome-ignore lint: for test
		} catch (error: any) {
			expect(error.errors[0].message).toBe(FORM_ERROR_MESSAGES.REQUIRED);
		}
	});

	it("should throw an error if password is too long", () => {
		const invalidInput = {
			username: "Valid-Username",
			password: "A".repeat(257), // 257 characters
		};

		try {
			signInSchema.parse(invalidInput);
			// biome-ignore lint: for test
		} catch (error: any) {
			expect(error.errors[0].message).toBe(FORM_ERROR_MESSAGES.TOO_LONG);
		}
	});
});
