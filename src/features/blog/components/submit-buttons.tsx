"use client";
import { Button } from "@/components/ui/button";
import { revertStatus } from "@/features/blog/actions/revert-status";
import { updateStatus } from "@/features/blog/actions/update-status";

export function SubmitButtons() {
	const handleUpdateStatus = async () => {
		await updateStatus();
	};
	const handleRevertStatus = async () => {
		await revertStatus();
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			<Button onClick={handleUpdateStatus}>UPDATE</Button>
			<Button onClick={handleRevertStatus}>REVERT</Button>
		</div>
	);
}
