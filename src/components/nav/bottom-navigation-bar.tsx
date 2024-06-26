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
import { cn } from "@/lib/utils";
import type { Category } from "@prisma/client";
import {
	CheckIcon,
	GitHubLogoIcon,
	HomeIcon,
	PlusIcon,
	TableIcon,
} from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
	categories: Omit<Category, "createdAt" | "updatedAt">[];
};

export function BottomNavigationBar({ categories }: Props) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<div className="mx-auto grid h-16 max-w-lg grid-cols-5">
				<Link href="/">
					<Button
						variant="navSide"
						size="navSide"
						className={cn(
							"rounded-s-full",
							pathname === "/" ? "bg-primary/10" : "",
						)}
					>
						<HomeIcon className="size-6" />
						<span className="sr-only">Home</span>
					</Button>
				</Link>

				<Link href="/all" className=" ">
					<Button
						variant="navSide"
						size="navSide"
						type="button"
						className={pathname === "/all" ? "bg-primary/10" : ""}
					>
						<TableIcon className="size-6" />
						<span className="sr-only">All</span>
					</Button>
				</Link>

				<DrawerTrigger asChild>
					<div className="flex items-center justify-center">
						<Button variant="navCenter" size="navCenter" type="button">
							<PlusIcon className="size-6 text-white" />
							<span className="sr-only">Add</span>
						</Button>
					</div>
				</DrawerTrigger>

				<Link href="/submit">
					<Button
						variant="navSide"
						size="navSide"
						type="button"
						className={pathname === "/submit" ? "bg-primary/10" : ""}
					>
						<CheckIcon className="size-6" />
						<span className="sr-only">Submit</span>
					</Button>
				</Link>

				<Link href={process.env.GITHUB_LINK ?? ""} target="_blank">
					<Button variant="navSide" size="navSide" className="rounded-e-full">
						<GitHubLogoIcon className="size-6" />
						<span className="sr-only">GitHub</span>
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
