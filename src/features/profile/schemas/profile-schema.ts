import { FORM_ERROR_MESSAGES } from "@/constants";
import { z } from "zod";

export const profileSchema = z.object({
	name: z
		.string()
		.min(1, { message: FORM_ERROR_MESSAGES.REQUIRED })
		.max(32, { message: FORM_ERROR_MESSAGES.TOO_LONG }),
	bio: z
		.string()
		.max(256, { message: FORM_ERROR_MESSAGES.TOO_LONG })
		.optional(),
	avatarUrl: z
		.string()
		.url()
		.max(256, { message: FORM_ERROR_MESSAGES.TOO_LONG })
		.optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
