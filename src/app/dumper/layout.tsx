import { Header } from "@/components/nav/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PAGE_NAME } from "@/constants";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const displayName = "DUMPER";

export const metadata: Metadata = {
	title: `${displayName} | ${PAGE_NAME}`,
	description: "Dump news and contents data.",
};

type Props = {
	news: ReactNode;
	contents: ReactNode;
	dump: ReactNode;
};

export default async function Layout({ news, contents, dump }: Props) {
	return (
		<>
			<Header title={displayName} />
			<Tabs defaultValue="news">
				<TabsList className="w-full">
					<TabsTrigger className="w-full" value="news">
						NEWS
					</TabsTrigger>
					<TabsTrigger className="w-full" value="contents">
						CONTENTS
					</TabsTrigger>
					<TabsTrigger className="w-full" value="dump">
						DUMP
					</TabsTrigger>
				</TabsList>
				<TabsContent value="news"> {news}</TabsContent>
				<TabsContent value="contents"> {contents}</TabsContent>
				<TabsContent value="dump">{dump}</TabsContent>
			</Tabs>
		</>
	);
}
