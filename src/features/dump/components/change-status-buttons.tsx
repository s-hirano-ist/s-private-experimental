"use client";
import { Button } from "@/components/ui/button";
import { changeContentsStatus } from "@/features/contents/actions/change-contents-status";
import { changeNewsStatus } from "@/features/news/actions/change-news-status";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function ChangeStatusButtons() {
	const { toast } = useToast();

	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleNewsUpdateStatus = async () => {
		setButtonDisabled(true);
		const response = await changeNewsStatus("UPDATE");
		// TODO: revalidate path
		toast({
			variant: response.success ? "default" : "destructive",
			description: response.message,
		});
		setButtonDisabled(false);
	};

	const handleNewsRevertStatus = async () => {
		setButtonDisabled(true);
		const response = await changeNewsStatus("REVERT");
		// TODO: revalidate path
		toast({
			variant: response.success ? "default" : "destructive",
			description: response.message,
		});
		setButtonDisabled(false);
	};

	const handleContentsUpdateStatus = async () => {
		setButtonDisabled(true);
		const response = await changeContentsStatus("UPDATE");
		// TODO: revalidate path
		toast({
			variant: response.success ? "default" : "destructive",
			description: response.message,
		});
		setButtonDisabled(false);
	};

	const handleContentsRevertStatus = async () => {
		setButtonDisabled(true);
		const response = await changeContentsStatus("REVERT");
		// TODO: revalidate path
		toast({
			variant: response.success ? "default" : "destructive",
			description: response.message,
		});
		setButtonDisabled(false);
	};

	return (
		<div className="grid grid-cols-2 gap-2 p-2">
			<Button onClick={handleNewsUpdateStatus} disabled={buttonDisabled}>
				NEWS UPDATE
			</Button>
			<Button onClick={handleNewsRevertStatus} disabled={buttonDisabled}>
				NEWS REVERT
			</Button>
			<Button onClick={handleContentsUpdateStatus} disabled={buttonDisabled}>
				CONTENTS UPDATE
			</Button>
			<Button onClick={handleContentsRevertStatus} disabled={buttonDisabled}>
				CONTENTS REVERT
			</Button>
		</div>
	);
}
