import { z } from "zod";
import { FORM_ERROR_MESSAGES } from "../constants";

export const newsDetailSchema = z.object({
	// TODO: sanitizing
	categoryId: z.number(),
	title: z
		.string()
		.min(1, { message: FORM_ERROR_MESSAGES.REQUIRED })
		.max(32, { message: FORM_ERROR_MESSAGES.TOO_LONG }),
	quote: z.string().max(256, { message: FORM_ERROR_MESSAGES.TOO_LONG }),
	url: z.string().url().min(1, { message: FORM_ERROR_MESSAGES.REQUIRED }),
});

export const categorySchema = z.object({
	newCategory: z
		.string()
		.max(16, { message: FORM_ERROR_MESSAGES.TOO_LONG })
		.nullable(),
});
