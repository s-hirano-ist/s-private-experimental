import { Header } from "@/components/nav/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PAGE_NAME } from "@/constants";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const displayName = "ADMIN";

export const metadata: Metadata = {
	title: `${displayName} | ${PAGE_NAME}`,
	description: "Admin page.",
};

type Props = {
	dumper: ReactNode;
	users: ReactNode;
};

export default async function Layout({ dumper, users }: Props) {
	return (
		<>
			<Header title={displayName} />
			<Tabs defaultValue="dumper">
				<TabsList className="w-full">
					<TabsTrigger className="w-full" value="dumper">
						DUMPER
					</TabsTrigger>
					<TabsTrigger className="w-full" value="users">
						USERS
					</TabsTrigger>
				</TabsList>
				<TabsContent value="dumper"> {dumper}</TabsContent>
				<TabsContent value="users"> {users}</TabsContent>
			</Tabs>
		</>
	);
}
