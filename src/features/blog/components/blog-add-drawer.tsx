"use client";
import { Button } from "@/components/ui/button";
import {
	DrawerClose,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { BlogAddForm } from "@/features/blog/components/blog-add-form";
import type { Category } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

type Props = {
	categories: Omit<Category, "createdAt" | "updatedAt">[];
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export function BlogAddDrawer({ categories, setOpen }: Props) {
	return (
		<>
			<DrawerHeader>
				<DrawerTitle>新規登録</DrawerTitle>
				<DrawerDescription>
					ブログに登録するデータを入力してください。
				</DrawerDescription>
			</DrawerHeader>
			<BlogAddForm categories={categories} setDialogOpen={setOpen}>
				<DrawerFooter>
					<div className="grid grid-cols-2 gap-4">
						<DrawerClose asChild>
							<Button variant="outline">キャンセル</Button>
						</DrawerClose>
						<Button type="submit">保存</Button>
					</div>
				</DrawerFooter>
			</BlogAddForm>
		</>
	);
}
