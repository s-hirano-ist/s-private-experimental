"use client";
import { Button } from "@/components/ui/button";
import {
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { UTIL_URLS } from "@/constants";
import { Link } from "next-view-transitions";

export function UtilsDrawer() {
	const handleReload = () => {
		window.location.reload();
	};

	return (
		<>
			<DrawerHeader>
				<DrawerTitle>便利ツール集</DrawerTitle>
				<DrawerDescription>リンクをクリックしてください。</DrawerDescription>
			</DrawerHeader>
			<div className="grid grid-cols-2 gap-2 px-2">
				{UTIL_URLS.map((url) => {
					return (
						<Link href={url.url} scroll={false} key={url.name}>
							<Button className="w-full">{url.name}</Button>
						</Link>
					);
				})}
				<Button className="col-span-2" onClick={handleReload}>
					RELOAD PAGE
				</Button>
			</div>
		</>
	);
}
