"use client";
import { Button } from "@/components/ui/button";
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
import { ERROR_MESSAGES } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@prisma/client";
import { ClipboardPasteIcon } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { addBlog } from "../actions/add-blog";
import { blogContext } from "../stores/blog-context";

type Props = {
	children: ReactNode;
	categories: Omit<Category, "createdAt" | "updatedAt">[];
	setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function BlogAddForm({ children, categories, setDialogOpen }: Props) {
	const { toast } = useToast();

	const [formData, setFormData] = useState<FormData>();
	const setQueuedContents = useSetRecoilState(blogContext);

	const NEW_CATEGORY_VALUE = "new"; // 新規の場合のcategoryのvalue
	const [newCategoryInputOpen, setNewCategoryInputOpen] = useState(false);

	const action = (_formData: FormData) => {
		setDialogOpen(false);
		setFormData(_formData);
	};

	useEffect(() => {
		try {
			if (formData !== undefined) {
				const submit = async () => {
					const state = await addBlog(formData);
					if (!state.success) {
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

	const handleSelectValueChange = (value: string) => {
		setNewCategoryInputOpen(value === NEW_CATEGORY_VALUE);
	};

	const urlInputRef = useRef<HTMLInputElement>(null);

	const handlePasteClick = async () => {
		const clipboardText = await navigator.clipboard.readText();
		if (urlInputRef.current !== null) urlInputRef.current.value = clipboardText;
	};

	return (
		<form action={action} className="space-y-4 p-4">
			<div className="space-y-1">
				<Label htmlFor="category">カテゴリー</Label>
				<Select
					name="category"
					required
					onValueChange={handleSelectValueChange}
				>
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
							<SelectItem value={String(category.id)} key={category.id}>
								{category.category}
							</SelectItem>
						))}
						<SelectItem value={NEW_CATEGORY_VALUE} key={NEW_CATEGORY_VALUE}>
							その他
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
			{newCategoryInputOpen && (
				<div className="space-y-1">
					<Input id="new_category" name="new_category" required />
				</div>
			)}
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
				<div className="flex space-x-2 px-2">
					<Input id="url" name="url" type="url" ref={urlInputRef} required />
					<Button variant="ghost" type="button" onClick={handlePasteClick}>
						<ClipboardPasteIcon />
					</Button>
				</div>
			</div>
			{children}
		</form>
	);
}
