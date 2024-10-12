import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Dispatch, SetStateAction } from "react";

type Props = {
	title: string;
	quote: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
export function EditDialog({ title, quote, open, setOpen }: Props) {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{quote}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
