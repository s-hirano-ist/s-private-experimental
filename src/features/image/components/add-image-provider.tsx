"use server";
import "server-only";
import { ERROR_MESSAGES } from "@/constants";
import { loggerError } from "@/pino";
import { AddImageForm } from "./add-image-form";

export async function AddImageProvider() {
	try {
		return <AddImageForm />;
	} catch (error) {
		loggerError(
			ERROR_MESSAGES.UNEXPECTED,
			{
				caller: "AddImageProvider",
				status: 500,
			},
			error,
		);
		return <></>;
	}
}
