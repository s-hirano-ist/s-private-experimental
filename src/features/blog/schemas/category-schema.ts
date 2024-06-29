import { z } from "zod";
import { FORM_ERROR_MESSAGES } from "../constants";

export const categorySchema = z.object({
	newCategory: z
		.string()
		.max(16, { message: FORM_ERROR_MESSAGES.TOO_LONG })
		.nullable(),
});
