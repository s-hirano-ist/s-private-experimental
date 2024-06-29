"use client";
import { Button } from "@/components/ui/button";
import { ERROR_MESSAGES } from "@/constants";
import { revertStatus } from "@/features/blog/actions/revert-status";
import { updateStatus } from "@/features/blog/actions/update-status";
import { useToast } from "@/hooks/use-toast";
import { sleep } from "@/lib/utils";

export function SubmitButtons() {
	const { toast } = useToast();

	const handleUpdateStatus = async () => {
		try {
			const state = await updateStatus();
			if (!state.success) {
				toast({
					variant: "destructive",
					description: state.message,
				});
				return;
			}
			toast({
				variant: "default",
				description: state.message,
			});
		} catch (error) {
			console.error("Unexpected error.", error);
			toast({
				variant: "destructive",
				description: ERROR_MESSAGES.UNEXPECTED,
			});
		}
	};
	const handleRevertStatus = async () => {
		try {
			const state = await revertStatus();
			if (!state.success) {
				toast({
					variant: "destructive",
					description: state.message,
				});
				return;
			}
			toast({
				variant: "default",
				description: state.message,
			});
		} catch (error) {
			console.error("Unexpected error.", error);
			toast({
				variant: "destructive",
				description: ERROR_MESSAGES.UNEXPECTED,
			});
		}
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			<Button onClick={handleUpdateStatus}>UPDATE</Button>
			<Button onClick={handleRevertStatus}>REVERT</Button>
		</div>
	);
}
