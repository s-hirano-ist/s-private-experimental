import { ContentsAddForm } from "./contents-add-form";

export function ContentsAddProvider() {
	try {
		return <ContentsAddForm />;
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
