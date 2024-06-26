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
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { submitBlog } from "../actions/submit";
import { ERROR_MESSAGES } from "../constants";
import { queuedContentsContext } from "../stores/queued-contents-context";

type Props = {
	children: ReactNode;
	categories: Omit<Category, "createdAt" | "updatedAt">[];
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function QueueForm({ children, categories, setDialogOpen }: Props) {
	const { toast } = useToast();

	const [formData, setFormData] = useState<FormData>();
	const setQueuedContents = useSetRecoilState(queuedContentsContext);

	const action = (_formData: FormData) => {
		setDialogOpen(false);
		setFormData(_formData);
	};

	useEffect(() => {
		try {
			if (formData !== undefined) {
				const submit = async () => {
					const state = await submitBlog(formData);
					if (!state.success) {
						// undefined or false
						toast({
							variant: "destructive",
							description: state.message,
						});
						setFormData(undefined);
						return;
					}
					const data = state.data;
					if (!data) throw new Error("State has no data error.");
					setQueuedContents((previousData) => [data, ...previousData]);
					toast({
						variant: "default",
						description: state.message,
					});
					setFormData(undefined);
				};
				submit();
			}
		} catch (error) {
			console.error("Unexpected error.", error);
			toast({
				variant: "destructive",
				description: ERROR_MESSAGES.UNEXPECTED,
			});
		}
	}, [formData, toast, setQueuedContents]);

	return (
		<form action={action} className="space-y-4 p-4">
			<div className="space-y-1">
				<Label htmlFor="category">カテゴリー</Label>
				<Select name="category" required>
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
			{children}
		</form>
	);
}
