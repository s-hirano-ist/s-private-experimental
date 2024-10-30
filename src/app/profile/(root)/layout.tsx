import { Header } from "@/components/nav/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PAGE_NAME } from "@/constants";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const displayName = "PROFILE";

export const metadata: Metadata = {
	title: `${displayName} | ${PAGE_NAME}`,
	description: "Profile page.",
};

type Props = {
	self: ReactNode;
	search: ReactNode;
	dump: ReactNode;
};

export default async function Layout({ self, search }: Props) {
	return (
		<>
			<Header title={displayName} />
			<Tabs defaultValue="search" className="mx-auto max-w-5xl sm:px-2">
				<TabsList className="w-full">
					<TabsTrigger className="w-full" value="self">
						SELF
					</TabsTrigger>
					<TabsTrigger className="w-full" value="search">
						SEARCH
					</TabsTrigger>
				</TabsList>
				<TabsContent value="self">{self}</TabsContent>
				<TabsContent value="search"> {search}</TabsContent>
			</Tabs>
		</>
	);
}
