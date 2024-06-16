"use client";
import { SubmitButton } from "@/components/form/submit-button";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { QueueForm } from "@/features/blog/components/queue-form";
import type { Category } from "@prisma/client";
import { GitHubLogoIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

type Props = {
	categories: Category[];
};

export function QueueDrawer({ categories }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<div className="grid grid-cols-2 gap-4 w-full">
				<DrawerTrigger asChild>
					<Button variant="outline">
						<PlusIcon />
					</Button>
				</DrawerTrigger>
				<Link href={process.env.GITHUB_LINK ?? ""} target="_blank">
					<Button variant="outline" className="w-full">
						<GitHubLogoIcon />
					</Button>
				</Link>
			</div>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>新規登録</DrawerTitle>
					<DrawerDescription>
						ブログに登録するデータを入力してください。
					</DrawerDescription>
				</DrawerHeader>
				<QueueForm categories={categories} setDialogOpen={setOpen}>
					<DrawerFooter>
						<div className="grid grid-cols-2 gap-4">
							<DrawerClose asChild>
								<Button variant="outline">キャンセル</Button>
							</DrawerClose>
							<SubmitButton label="保存" />
						</div>
					</DrawerFooter>
				</QueueForm>
			</DrawerContent>
		</Drawer>
	);
}
