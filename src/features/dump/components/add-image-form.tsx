"use client";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { addImage } from "@/features/dump/actions/add-image";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function AddImageForm() {
	const [_, setFile] = useState<File | null>(null);
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setFile(e.target.files[0]);
	};

	const { toast } = useToast();

	async function handleSubmit(formData: FormData) {
		const response = await addImage(formData);
		if (!response.success) {
			toast({
				variant: "destructive",
				description: response.message,
			});
			return;
		}
		setFile(null);
	}

	return (
		<Card className="m-2 mx-auto w-full">
			<CardHeader>
				<CardTitle>Image Uploader</CardTitle>
			</CardHeader>
			<CardContent>
				<form action={handleSubmit} className="space-y-4">
					<Input
						type="file"
						name="file"
						onChange={handleFileChange}
						accept="image/*"
						required
					/>
					<SubmitButton label="アップロード" />
				</form>
			</CardContent>
		</Card>
	);
}
