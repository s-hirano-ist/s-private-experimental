"use client";
import { SubmitButton } from "@/components/submit-button";
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
import { addBlog } from "@/features/dump/actions/add-blog";
import { blogContext } from "@/features/dump/stores/blog-context";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@prisma/client";
import { ClipboardPasteIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

type Props = {
	categories: Omit<Category, "createdAt" | "updatedAt">[];
};

export function BlogAddForm({ categories }: Props) {
	const titleInputRef = useRef<HTMLInputElement>(null);
	const quoteInputRef = useRef<HTMLTextAreaElement>(null);
	const urlInputRef = useRef<HTMLInputElement>(null);

	const { toast } = useToast();

	const setQueuedContents = useSetRecoilState(blogContext);

	const NEW_CATEGORY_VALUE = "new"; // 新規の場合のcategoryのvalue
	const [newCategoryInputOpen, setNewCategoryInputOpen] = useState(false);

	const formAction = async (formData: FormData) => {
		const state = await addBlog(formData);
		if (!state.success) {
			toast({
				variant: "destructive",
				description: state.message,
			});
			return;
		}
		setQueuedContents((previousData) => [state.data, ...(previousData ?? [])]);
		toast({
			variant: "default",
			description: state.message,
		});
		if (titleInputRef.current) titleInputRef.current.value = "";
		if (quoteInputRef.current) quoteInputRef.current.value = "";
		if (urlInputRef.current) urlInputRef.current.value = "";
	};

	const handleSelectValueChange = (value: string) => {
		setNewCategoryInputOpen(value === NEW_CATEGORY_VALUE);
	};

	const handlePasteClick = async () => {
		const clipboardText = await navigator.clipboard.readText();
		if (urlInputRef.current !== null) urlInputRef.current.value = clipboardText;
	};

	return (
		// MEMO: experimental feature of using form actions
		<form action={formAction} className="space-y-4 p-4">
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
								{category.name}
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
				<Input id="title" name="title" ref={titleInputRef} required />
			</div>
			<div className="space-y-1">
				<Label htmlFor="quote">ひとこと</Label>
				<Textarea id="quote" name="quote" ref={quoteInputRef} />
			</div>
			<div className="space-y-1">
				<Label htmlFor="url">URL</Label>
				<div className="flex space-x-2 px-2">
					<Input
						id="url"
						name="url"
						type="url"
						inputMode="url"
						ref={urlInputRef}
						required
					/>
					<Button variant="ghost" type="button" onClick={handlePasteClick}>
						<ClipboardPasteIcon />
					</Button>
				</div>
			</div>
			<SubmitButton label="保存" />
		</form>
	);
}
