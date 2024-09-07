import { FORM_ERROR_MESSAGES } from "@/constants";
import { z } from "zod";

export const signInSchema = z.object({
	// TODO: sanitizing
	email: z
		.string()
		.email({ message: FORM_ERROR_MESSAGES.INVALID_FORMAT })
		.min(1, { message: FORM_ERROR_MESSAGES.REQUIRED })
		.max(32, { message: FORM_ERROR_MESSAGES.TOO_LONG }),
	password: z
		.string()
		.min(1, { message: FORM_ERROR_MESSAGES.REQUIRED })
		.max(256, { message: FORM_ERROR_MESSAGES.TOO_LONG }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
