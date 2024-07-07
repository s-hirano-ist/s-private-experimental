"use client";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ERROR_MESSAGES } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { ClipboardPasteIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { addMypage } from "../actions/add-mypage";
import { mypageContext } from "../stores/mypage-context";

export function MypageAddForm() {
	const titleInputRef = useRef<HTMLInputElement>(null);
	const quoteInputRef = useRef<HTMLTextAreaElement>(null);
	const urlInputRef = useRef<HTMLInputElement>(null);

	const { toast } = useToast();

	const [formData, setFormData] = useState<FormData>();
	const setQueuedContents = useSetRecoilState(mypageContext);

	useEffect(() => {
		try {
			if (formData !== undefined) {
				const submit = async () => {
					const state = await addMypage(formData);
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
					if (titleInputRef.current) titleInputRef.current.value = "";
					if (quoteInputRef.current) quoteInputRef.current.value = "";
					if (urlInputRef.current) urlInputRef.current.value = "";
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

	const handlePasteClick = async () => {
		const clipboardText = await navigator.clipboard.readText();
		if (urlInputRef.current !== null) urlInputRef.current.value = clipboardText;
	};

	return (
		<form action={setFormData} className="space-y-4 p-4">
			<div className="space-y-1">
				<Label htmlFor="title">タイトル</Label>
				<Input id="title" name="title" ref={titleInputRef} required />
			</div>
			<div className="space-y-1">
				<Label htmlFor="quote">ひとこと</Label>
				<Textarea id="quote" name="quote" ref={quoteInputRef} required />
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
			<SubmitButton label="保存" />
		</form>
	);
}
