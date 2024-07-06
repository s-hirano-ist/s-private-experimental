"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import type { Category } from "@prisma/client";
import {
	CheckIcon,
	CodeIcon,
	HomeIcon,
	PlusIcon,
	TableIcon,
} from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BlogAddDrawer } from "../../features/blog/components/blog-add-drawer";

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

				<Link href="/mypage">
					<Button
						variant="navSide"
						size="navSide"
						className={cn(
							"rounded-e-full",
							pathname === "/mypage" ? "bg-primary/10" : "",
						)}
					>
						<CodeIcon className="size-6" />
						<span className="sr-only">Mypage</span>
					</Button>
				</Link>
			</div>
			<DrawerContent>
				<BlogAddDrawer categories={categories} setOpen={setOpen} />
			</DrawerContent>
		</Drawer>
	);
}
