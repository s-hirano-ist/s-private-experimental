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
import prisma from "@/server/db";
import { GitHubLogoIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
export async function QueueDrawer() {
	const categories = await prisma.category.findMany({
		select: { id: true, category: true },
	});

	return (
		<Drawer>
			<div className="grid grid-cols-2 gap-4 w-full">
				<DrawerTrigger asChild>
					<Button variant="outline">
						<PlusIcon />
					</Button>
				</DrawerTrigger>
				<Link href={process.env.GITHUB_LINK ?? ""} target="_blank">
					<Button variant="outline" className="w-full">
						<GitHubLogoIcon />
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
				<QueueForm categories={categories}>
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
