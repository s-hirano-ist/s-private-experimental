import { AddContentsForm } from "./add-contents-form";

export function AddContentsProvider() {
	try {
		return <AddContentsForm />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
