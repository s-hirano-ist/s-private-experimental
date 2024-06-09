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
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useFormState } from "react-dom";
import { type SubmitBlogState, submitBlog } from "../actions/submit";

const initialState: SubmitBlogState = {
	success: undefined,
	message: "",
};

type Category = {
	id: number;
	heading: string;
};

export function Form({
	children,
	categories,
}: { children: ReactNode; categories: Category[] }) {
	const { toast } = useToast();

	const [state, formAction] = useFormState(submitBlog, initialState);

	useEffect(() => {
		if (state.success === undefined) return;
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	}, [state, toast]);

	return (
		<form action={formAction} className="p-4 space-y-4">
			<div className="space-y-1">
				<Label htmlFor="category">カテゴリー</Label>
				<Select name="category">
					<SelectTrigger>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
							<SelectItem value={String(category.id)} key={category.id}>
								{category.heading}
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
