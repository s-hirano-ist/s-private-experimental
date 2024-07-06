"use client";
import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { changeNewsDetailStatus } from "@/features/blog/actions/change-news-detail-status";
import { useToast } from "@/hooks/use-toast";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { changeMypageStatus } from "../actions/change-mypage-status";

export function SubmitButtons() {
	const { toast } = useToast();

	const handleBlogUpdateStatus = async () => {
		const state = await changeNewsDetailStatus("UPDATE");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	};

	const handleBlogRevertStatus = async () => {
		const state = await changeNewsDetailStatus("REVERT");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	};

	const handleMypageUpdateStatus = async () => {
		const state = await changeMypageStatus("UPDATE");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	};

	const handleMypageRevertStatus = async () => {
		const state = await changeMypageStatus("REVERT");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			<Link
				href={new URL(env.NEXT_PUBLIC_GITHUB_LINK)}
				target="_blank"
				className="col-start-2"
			>
				<Button variant="ghost">
					<GitHubLogoIcon className="size-8" />
					<span className="sr-only">GitHub</span>
				</Button>
			</Link>
			<Button onClick={handleBlogUpdateStatus}>BLOG UPDATE</Button>
			<Button onClick={handleBlogRevertStatus}>BLOG REVERT</Button>
			<Button onClick={handleMypageUpdateStatus}>MYPAGE UPDATE</Button>
			<Button onClick={handleMypageRevertStatus}>MYPAGE REVERT</Button>
		</div>
	);
}
