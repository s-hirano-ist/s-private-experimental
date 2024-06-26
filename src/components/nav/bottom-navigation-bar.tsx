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
import {
	CheckIcon,
	GitHubLogoIcon,
	HomeIcon,
	PlusIcon,
	TableIcon,
} from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { useState } from "react";

type Props = {
	categories: Category[];
};

export function BottomNavigationBar({ categories }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<div className="mx-auto grid  h-16 max-w-lg grid-cols-5">
				<Button variant="navSide" size="navSide" className="rounded-s-full">
					<Link href="/">
						<HomeIcon className="size-6" />
						<span className="sr-only">Home</span>
					</Link>
				</Button>
				<Button variant="navSide" size="navSide" type="button">
					<Link href="/all">
						<TableIcon className="size-6" />
						<span className="sr-only">All</span>
					</Link>
				</Button>
				<DrawerTrigger asChild>
					<div className="flex items-center justify-center">
						<Button variant="navCenter" size="navCenter" type="button">
							<PlusIcon className="size-6 text-white" />
							<span className="sr-only">Add</span>
						</Button>
					</div>
				</DrawerTrigger>

				<Button variant="navSide" size="navSide" type="button">
					<Link href="/submit">
						<CheckIcon className="size-6" />
						<span className="sr-only">Submit</span>
					</Link>
				</Button>
				<Button variant="navSide" size="navSide" className="rounded-e-full">
					<Link href={process.env.GITHUB_LINK ?? ""} target="_blank">
						<GitHubLogoIcon className="size-6" />
						<span className="sr-only">GitHub</span>
					</Link>
				</Button>
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
