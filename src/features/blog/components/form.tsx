"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function Form({ children }: { children: ReactNode }) {
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
				<Label htmlFor="title">タイトル</Label>
				<Input id="title" name="title" required />
			</div>
			<div className="space-y-1">
				<Label htmlFor="current">ひとこと</Label>
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
