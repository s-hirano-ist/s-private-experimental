"use client";
import { Button } from "@/components/ui/button";
import {
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { changeBlogStatus } from "@/features/blog/actions/change-blog-status";
import { useToast } from "@/hooks/use-toast";
import type { Dispatch, SetStateAction } from "react";
import { changeMypageStatus } from "../../mypage/actions/change-mypage-status";

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function SubmitDrawer({ setOpen }: Props) {
	const { toast } = useToast();

	const handleBlogUpdateStatus = async () => {
		setOpen(false);
		const state = await changeBlogStatus("UPDATE");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	};

	const handleBlogRevertStatus = async () => {
		setOpen(false);
		const state = await changeBlogStatus("REVERT");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
	};

	const handleMypageUpdateStatus = async () => {
		setOpen(false);
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
		<>
			<DrawerHeader>
				<DrawerTitle>アクション</DrawerTitle>
				<DrawerDescription>
					実行するアクションを選択してください。
				</DrawerDescription>
			</DrawerHeader>
			<div className="grid grid-cols-2 gap-4 px-4">
				<Button onClick={handleBlogUpdateStatus}>BLOG UPDATE</Button>
				<Button onClick={handleBlogRevertStatus}>BLOG REVERT</Button>
				<Button onClick={handleMypageUpdateStatus}>MYPAGE UPDATE</Button>
				<Button onClick={handleMypageRevertStatus}>MYPAGE REVERT</Button>
			</div>
		</>
	);
}
