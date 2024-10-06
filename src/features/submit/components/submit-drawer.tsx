"use client";
import { Button } from "@/components/ui/button";
import {
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { changeContentsStatus } from "@/features/submit/actions/change-contents-status";
import { changeNewsStatus } from "@/features/submit/actions/change-news-status";
import { useToast } from "@/hooks/use-toast";
import { Link } from "next-view-transitions";
import { type Dispatch, type SetStateAction, useState } from "react";

type Props = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function SubmitDrawer({ setOpen }: Props) {
	const { toast } = useToast();

	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleNewsUpdateStatus = async () => {
		setButtonDisabled(true);
		setOpen(false);
		const state = await changeNewsStatus("UPDATE");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		setButtonDisabled(false);
	};

	const handleNewsRevertStatus = async () => {
		setButtonDisabled(true);
		setOpen(false);
		const state = await changeNewsStatus("REVERT");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		setButtonDisabled(false);
	};

	const handleContentsUpdateStatus = async () => {
		setButtonDisabled(true);
		setOpen(false);
		const state = await changeContentsStatus("UPDATE");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		setButtonDisabled(false);
	};

	const handleContentsRevertStatus = async () => {
		setButtonDisabled(true);
		setOpen(false);
		const state = await changeContentsStatus("REVERT");
		toast({
			variant: state.success ? "default" : "destructive",
			description: state.message,
		});
		setButtonDisabled(false);
	};

	const handleReload = () => {
		window.location.reload();
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
			<Link href="/dump/all" className="p-4" scroll={false}>
				<Button className="w-full">ALL DATA</Button>
			</Link>
			<Button className="mx-4" onClick={handleReload}>
				RELOAD PAGE
			</Button>
		</>
	);
}
