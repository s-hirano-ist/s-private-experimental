"use server";
import "server-only";
import { AddContentsForm } from "./add-contents-form";

export async function AddContentsProvider() {
	try {
		return <AddContentsForm />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
