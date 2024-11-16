import { Header } from "@/components/nav/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PAGE_NAME } from "@/constants";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const displayName = "CONTENTS";

export const metadata: Metadata = {
	title: `${displayName} | ${PAGE_NAME}`,
	description: "Private contents",
};

type Props = {
	books: ReactNode;
	notes: ReactNode;
	images: ReactNode;
};

export default async function Layout({ books, notes, images }: Props) {
	return (
		<>
			<Header title={displayName} />
			<Tabs defaultValue="notes" className="mx-auto max-w-5xl sm:px-2">
				<TabsList className="w-full">
					<TabsTrigger className="w-full" value="books">
						BOOKS
					</TabsTrigger>
					<TabsTrigger className="w-full" value="notes">
						NOTES
					</TabsTrigger>
					<TabsTrigger className="w-full" value="images">
						IMAGES
					</TabsTrigger>
				</TabsList>
				<TabsContent value="books"> {books}</TabsContent>
				<TabsContent value="notes"> {notes}</TabsContent>
				<TabsContent value="images"> {images}</TabsContent>
			</Tabs>
		</>
	);
}
