"use client";
import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { changeStatus } from "@/features/blog/actions/change-status";
import { useToast } from "@/hooks/use-toast";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";

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
		<div className="grid grid-cols-3 gap-4 text-center">
			<Button onClick={handleUpdateStatus}>UPDATE</Button>
			<Link href={new URL(env.NEXT_PUBLIC_GITHUB_LINK)} target="_blank">
				<Button variant="ghost">
					<GitHubLogoIcon className="size-8" />
					<span className="sr-only">GitHub</span>
				</Button>
			</Link>
			<Button onClick={handleRevertStatus}>REVERT</Button>
		</div>
	);
}
