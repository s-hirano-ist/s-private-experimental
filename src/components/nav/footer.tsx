"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { UtilsDrawer } from "@/features/dump/components/utils-drawer";
import { cn } from "@/utils/tailwindcss";
import {
	FileUpIcon,
	LockIcon,
	NotebookIcon,
	SendIcon,
	UserRoundPenIcon,
} from "lucide-react";
import type { Route } from "next";
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
		<footer className="sticky bottom-4 z-50 mx-auto w-full max-w-lg rounded-3xl border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700 ">
			<Drawer open={open} onOpenChange={setOpen} snapPoints={[0.5]}>
				<div className="mx-auto grid h-16 max-w-lg grid-cols-5 rounded-3xl bg-gradient-to-r from-primary to-primary-grad text-white">
					{/* FIXME: bug with parallel routes
					 * https://nextjs.org/docs/app/building-your-application/routing/parallel-routes */}
					<Link href={"/" as Route} scroll={false}>
						<Button
							variant="navSide"
							size="navSide"
							className={cn(
								"rounded-s-3xl",
								pathname === "/" ? "bg-black/40" : "",
							)}
						>
							{Icon("DUMPER", <FileUpIcon className="size-6" />)}
						</Button>
					</Link>

					{/* FIXME: bug with parallel routes
					 * https://nextjs.org/docs/app/building-your-application/routing/parallel-routes */}
					<Link href={"/contents" as Route} scroll={false}>
						<Button
							variant="navSide"
							size="navSide"
							type="button"
							className={pathname === "/contents" ? "bg-black/40" : ""}
						>
							{Icon("CONTENTS", <NotebookIcon className="size-6" />)}
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

					{/* FIXME: bug with parallel routes
					 * https://nextjs.org/docs/app/building-your-application/routing/parallel-routes */}
					<Link href={"/profile" as Route} scroll={false}>
						<Button
							variant="navSide"
							size="navSide"
							type="button"
							className={pathname === "/profile" ? "bg-black/40" : ""}
						>
							{Icon("PROFILE", <UserRoundPenIcon className="size-6" />)}
						</Button>
					</Link>

					{/* FIXME: bug with parallel routes
					 * https://nextjs.org/docs/app/building-your-application/routing/parallel-routes */}
					<Link href={"/admin" as Route} scroll={false}>
						<Button
							variant="navSide"
							size="navSide"
							className={cn(
								"rounded-e-3xl",
								pathname === "/admin" ? "bg-black/40" : "",
							)}
						>
							{Icon("ADMIN", <LockIcon className="size-6" />)}
						</Button>
					</Link>
				</div>
				<DrawerContent>
					<UtilsDrawer />
				</DrawerContent>
			</Drawer>
		</footer>
	);
}
