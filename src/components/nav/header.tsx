"use client";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Image from "next/image";
// import { Button } from "../ui/button";

type Props = {
	title: string;
};

export function Header({ title }: Props) {
	return (
		<header className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary to-primary-grad p-4 text-white">
			<div className="flex items-center justify-between sm:px-4">
				<div className="flex items-center justify-start gap-4">
					<Image
						src="/apple-icon.png"
						width={50}
						height={50}
						alt=""
						className="size-12 object-cover"
					/>
					<p className="text-2xl font-semibold">{title}</p>
				</div>
				{/* TODO: add theme button */}
				{/* <nav>
					<Button
						variant="ghost"
						onClick={() => setTheme("light")}
						className="block dark:hidden"
					>
						<MoonIcon className="size-8" />
						<span className="sr-only">light theme button</span>
					</Button>
					<Button
						variant="ghost"
						onClick={() => setTheme("dark")}
						className="hidden dark:block"
					>
						<SunIcon className="size-8" />
						<span className="sr-only">dark theme button</span>
					</Button>
				</nav> */}
			</div>
		</header>
	);
}
