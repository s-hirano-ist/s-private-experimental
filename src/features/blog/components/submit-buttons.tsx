"use client";
import { Button } from "@/components/ui/button";
import { changeStatus } from "@/features/blog/actions/change-status";
import { useToast } from "@/hooks/use-toast";

export function SubmitButtons() {
	const { toast } = useToast();

	const handleUpdateStatus = async () => {
		const state = await changeStatus("UPDATE");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	};

	const handleRevertStatus = async () => {
		const state = await changeStatus("REVERT");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			<Button onClick={handleUpdateStatus}>UPDATE</Button>
			<Button onClick={handleRevertStatus}>REVERT</Button>
		</div>
	);
}
