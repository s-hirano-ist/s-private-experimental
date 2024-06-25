import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/app-provider";
import { BottomNavigationBar } from "@/components/nav/bottom-navigation-bar";
import { Toaster } from "@/components/ui/toaster";
import prisma from "@/server/db";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import type { ReactNode } from "react";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dump",
	description: "Dump blog data to GitHub",
};

export default async function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	try {
		const categories = await prisma.category.findMany({
			select: { id: true, category: true },
		});
		return (
			<ViewTransitions>
				<html lang="ja">
					<body className={notoSansJp.className}>
						<AppProvider>
							<main className="flex min-h-screen flex-col items-center justify-between p-4">
								{children}
								<BottomNavigationBar categories={categories} />
							</main>
							<Analytics debug={false} />
							<Toaster />
						</AppProvider>
					</body>
				</html>
			</ViewTransitions>
		);
	} catch (error) {
		console.error("Unexpected error.", error);
		return <></>;
	}
}
