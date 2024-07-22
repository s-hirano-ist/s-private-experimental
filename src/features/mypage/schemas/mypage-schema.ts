import { FORM_ERROR_MESSAGES } from "@/constants";
import { z } from "zod";

export const mypageSchema = z.object({
	// TODO: sanitizing
	title: z
		.string()
		.min(1, { message: FORM_ERROR_MESSAGES.REQUIRED })
		.max(32, { message: FORM_ERROR_MESSAGES.TOO_LONG }),
	quote: z.string().max(256, { message: FORM_ERROR_MESSAGES.TOO_LONG }),
	url: z.string().url().min(1, { message: FORM_ERROR_MESSAGES.REQUIRED }),
});
