import { SubmitButton } from "@/components/form/submit-button";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { Form } from "@/features/blog/components/form";
import { QueuedTable } from "@/features/blog/components/queued-table";
import prisma from "@/server/db";
import { GitHubLogoIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Home() {
	const newsDetails = await prisma.newsDetail.findMany({
		where: {
			exported: false,
		},
		select: {
			title: true,
			quote: true,
			url: true,
			news: {
				select: {
					heading: true,
				},
			},
		},
	});
	const data = newsDetails.map((d) => {
		return {
			title: d.title,
			quote: d.quote,
			url: d.url,
			category: d.news?.heading ?? "",
		};
	});

	const newsCategories = await prisma.news.findMany({
		select: {
			id: true,
			heading: true,
		},
	});

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>エクスポート待ち</CardTitle>
				<CardDescription>LocalのGitへ書き込み待ちのデータ一覧</CardDescription>
			</CardHeader>
			<CardContent>
				<QueuedTable data={data} />
			</CardContent>
			<CardFooter className="flex justify-between">
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
						<Form categories={newsCategories}>
							<DrawerFooter>
								<div className="grid grid-cols-2 gap-4">
									<DrawerClose asChild>
										<Button variant="outline">キャンセル</Button>
									</DrawerClose>
									<SubmitButton label="保存" />
								</div>
							</DrawerFooter>
						</Form>
					</DrawerContent>
				</Drawer>
			</CardFooter>
		</Card>
	);
}
