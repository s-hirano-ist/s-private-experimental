"use client";
import { Button } from "@/components/ui/button";
import {
	DrawerClose,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";

export function BlogAddDrawer() {
	return (
		<>
			<DrawerHeader>
				<DrawerTitle>新規登録</DrawerTitle>
				<DrawerDescription>
					ブログに登録するデータを入力してください。
				</DrawerDescription>
			</DrawerHeader>
			<div>XXXXXXXXXXXXXXXXX</div>
			<DrawerFooter>
				<div className="grid grid-cols-2 gap-4">
					<DrawerClose asChild>
						<Button variant="outline">キャンセル</Button>
					</DrawerClose>
					<Button type="submit">保存</Button>
				</div>
			</DrawerFooter>
		</>
	);
}
