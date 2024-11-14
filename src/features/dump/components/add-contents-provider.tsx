"use server";
import "server-only";
import { ERROR_MESSAGES } from "@/constants";
import { loggerError } from "@/pino";
import { AddContentsForm } from "./add-contents-form";

export async function AddContentsProvider() {
	try {
		return <AddContentsForm />;
	} catch (error) {
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "AddContentsProvider",
				status: 500,
			},
			error,
		);
		return <></>;
	}
}
