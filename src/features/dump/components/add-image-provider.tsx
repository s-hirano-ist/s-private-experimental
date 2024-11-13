"use server";
import "server-only";
import { AddImageForm } from "./add-image-form";

export async function AddImageProvider() {
	try {
		return <AddImageForm />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
