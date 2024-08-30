"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { SubmitDrawer } from "@/features/submit/components/submit-drawer";
import { cn } from "@/lib/utils";
import {
	BookOpenIcon,
	LockIcon,
	LockOpenIcon,
	NotebookIcon,
	SendIcon,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

export function Footer() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const Icon = (name: string, icon: ReactNode) => {
		return (
			<div className="flex flex-col items-center">
				{icon}
				<div className="text-xs font-thin">{name}</div>
				<span className="sr-only">{name}</span>
			</div>
		);
	};

	return (
		<footer className="sticky bottom-4 z-50 mx-auto w-full max-w-lg rounded-3xl border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
			<Drawer open={open} onOpenChange={setOpen} snapPoints={[0.5]}>
				<div className="mx-auto grid h-16 max-w-lg grid-cols-5 rounded-3xl bg-gradient-to-r from-primary to-primary-grad text-white">
					<Link href="/dump/blog">
						<Button
							variant="navSide"
							size="navSide"
							className={cn(
								"rounded-s-3xl",
								pathname === "/dump/blog" ? "bg-black/40" : "",
							)}
						>
							{Icon("PUBLIC", <LockOpenIcon className="size-6" />)}
						</Button>
					</Link>

					<Link href="/dump/mypage" className=" ">
						<Button
							variant="navSide"
							size="navSide"
							type="button"
							className={pathname === "/dump/mypage" ? "bg-black/40" : ""}
						>
							{Icon("PRIVATE", <LockIcon className="size-6" />)}
						</Button>
					</Link>

					<DrawerTrigger asChild>
						<div className="flex items-center justify-center">
							<Button variant="navCenter" size="navCenter" type="button">
								{Icon("", <SendIcon className="size-6 text-white" />)}
								<span className="sr-only">Action</span>
							</Button>
						</div>
					</DrawerTrigger>

					<Link href="/contents/books">
						<Button
							variant="navSide"
							size="navSide"
							type="button"
							className={pathname === "/contents/books" ? "bg-black/40" : ""}
						>
							{Icon("BOOKS", <BookOpenIcon className="size-6" />)}
						</Button>
					</Link>

					<Link href="/contents/notes">
						<Button
							variant="navSide"
							size="navSide"
							className={cn(
								"rounded-e-3xl",
								pathname === "/contents/notes" ? "bg-black/40" : "",
							)}
						>
							{Icon("NOTES", <NotebookIcon className="size-6" />)}
						</Button>
					</Link>
				</div>
				<DrawerContent>
					<SubmitDrawer setOpen={setOpen} />
				</DrawerContent>
			</Drawer>
		</footer>
	);
}
