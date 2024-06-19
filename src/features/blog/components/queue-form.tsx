"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@prisma/client";
import { useEffect } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useFormState } from "react-dom";
import { useSetRecoilState } from "recoil";
import { type SubmitBlogState, submitBlog } from "../actions/submit";
import { queuedContentsContext } from "../stores/queued-contents-context";

const initialState: SubmitBlogState = {
	success: undefined,
	message: "",
};

type Props = {
	children: ReactNode;
	categories: Category[];
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function QueueForm({ children, categories, setDialogOpen }: Props) {
	const { toast } = useToast();

	const [state, formAction] = useFormState(submitBlog, initialState);
	const setQueuedContents = useSetRecoilState(queuedContentsContext);

	useEffect(() => {
		if (state.success === undefined) return;
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		const data = state.data;
		if (!data) throw new Error("State has no data error.");
		setQueuedContents((previousData) => [data, ...previousData]);
	}, [state, toast, setQueuedContents]);

	const action = (formdata: FormData) => {
		setDialogOpen(false);
		formAction(formdata);
	};

	return (
		<form action={action} className="space-y-4 p-4">
			<div className="space-y-1">
				<Label htmlFor="category">カテゴリー</Label>
				<Select name="category">
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
							<SelectItem value={String(category.id)} key={category.id}>
								{category.category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-1">
				<Label htmlFor="title">タイトル</Label>
				<Input id="title" name="title" required />
			</div>
			<div className="space-y-1">
				<Label htmlFor="quote">ひとこと</Label>
				<Textarea id="quote" name="quote" />
			</div>
			<div className="space-y-1">
				<Label htmlFor="url">URL</Label>
				<Input id="url" name="url" type="url" required />
			</div>
			<p aria-live="polite" className="sr-only">
				{state?.message}
			</p>
			{children}
		</form>
	);
}
