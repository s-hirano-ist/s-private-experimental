"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
	NewspaperIcon,
	SendIcon,
	SettingsIcon,
	TableIcon,
	VariableIcon,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { BlogAddDrawer } from "../../features/blog/components/blog-add-drawer";

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
		<footer className="sticky bottom-4 z-50 mx-auto w-full max-w-lg rounded-full border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
			<Drawer open={open} onOpenChange={setOpen}>
				<div className="mx-auto grid h-16 max-w-lg grid-cols-5 rounded-full bg-gradient-to-r from-primary to-primary-grad text-white">
					<Link href="/">
						<Button
							variant="navSide"
							size="navSide"
							className={cn(
								"rounded-s-full",
								pathname === "/" ? "bg-black/40" : "",
							)}
						>
							{Icon("ブログ", <NewspaperIcon className="size-6" />)}
						</Button>
					</Link>

					<Link href="/mypage" className=" ">
						<Button
							variant="navSide"
							size="navSide"
							type="button"
							className={pathname === "/mypage" ? "bg-black/40" : ""}
						>
							{Icon("マイページ", <VariableIcon className="size-6" />)}
						</Button>
					</Link>

					<DrawerTrigger asChild>
						<div className="flex items-center justify-center">
							<Button variant="navCenter" size="navCenter" type="button">
								{Icon("送信", <SendIcon className="size-6 text-white" />)}

								{/* <SendIcon className="size-6 text-white" /> */}
								<span className="sr-only">Submit</span>
							</Button>
						</div>
					</DrawerTrigger>

					<Link href="/all">
						<Button
							variant="navSide"
							size="navSide"
							type="button"
							className={pathname === "/all" ? "bg-black/40" : ""}
						>
							{Icon("全データ", <TableIcon className="size-6" />)}
						</Button>
					</Link>

					<Link href="/settings">
						<Button
							variant="navSide"
							size="navSide"
							className={cn(
								"rounded-e-full",
								pathname === "/settings" ? "bg-black/40" : "",
							)}
						>
							{Icon("設定", <SettingsIcon className="size-6" />)}
						</Button>
					</Link>
				</div>
				<DrawerContent>
					<BlogAddDrawer />
				</DrawerContent>
			</Drawer>{" "}
		</footer>
	);
}
