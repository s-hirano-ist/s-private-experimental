import { FORM_ERROR_MESSAGES } from "@/constants";
import { z } from "zod";

export const signInSchema = z.object({
	username: z
		.string({ message: FORM_ERROR_MESSAGES.REQUIRED })
		.trim()
		.min(1, { message: FORM_ERROR_MESSAGES.REQUIRED })
		.max(32, { message: FORM_ERROR_MESSAGES.TOO_LONG })
		.regex(/^[A-Za-z-]+$/, FORM_ERROR_MESSAGES.ALPHABET_ONLY),
	password: z
		.string({ message: FORM_ERROR_MESSAGES.REQUIRED })
		.trim()
		.min(1, { message: FORM_ERROR_MESSAGES.REQUIRED })
		.max(256, { message: FORM_ERROR_MESSAGES.TOO_LONG }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
