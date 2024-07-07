import { Header } from "@/components/nav/header";
import { LoadingStack } from "@/components/table/loading-stack";
import { Separator } from "@/components/ui/separator";
import { MypageAddForm } from "@/features/mypage/components/mypage-add-form";
import { MypageContents } from "@/features/mypage/components/mypage-contents";
import type { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Mypage | Dump",
	description: "Dump blog data to GitHub",
};

export default function Page() {
	return (
		<>
			<Header title="Mypageへの送信" />
			<MypageAddForm />
			<Separator className="h-px bg-gradient-to-r from-primary to-primary-grad" />
			<Suspense fallback={<LoadingStack />}>
				<MypageContents />
			</Suspense>
		</>
	);
}
