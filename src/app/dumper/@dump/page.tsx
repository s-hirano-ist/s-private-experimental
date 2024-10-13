"use client";
import { Button } from "@/components/ui/button";
import { changeContentsStatus } from "@/features/update-status/actions/change-contents-status";
import { changeNewsStatus } from "@/features/update-status/actions/change-news-status";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Page() {
	const { toast } = useToast();

	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleNewsUpdateStatus = async () => {
		setButtonDisabled(true);
		const state = await changeNewsStatus("UPDATE");
		// TODO: revalidate path
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		setButtonDisabled(false);
	};

	const handleNewsRevertStatus = async () => {
		setButtonDisabled(true);
		const state = await changeNewsStatus("REVERT");
		// TODO: revalidate path
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		setButtonDisabled(false);
	};

	const handleContentsUpdateStatus = async () => {
		setButtonDisabled(true);
		const state = await changeContentsStatus("UPDATE");
		// TODO: revalidate path
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		setButtonDisabled(false);
	};

	const handleContentsRevertStatus = async () => {
		setButtonDisabled(true);
		const state = await changeContentsStatus("REVERT");
		// TODO: revalidate path
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		setButtonDisabled(false);
	};

	return (
		<div className="grid grid-cols-2 gap-4 p-4">
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
