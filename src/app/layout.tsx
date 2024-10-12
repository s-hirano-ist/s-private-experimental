import AppProvider from "@/components/app-provider";
import { Footer } from "@/components/nav/footer";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Noto_Sans_JP } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { PAGE_NAME } from "@/constants";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: `${PAGE_NAME}`,
	description: "Private pages and admin tools for s-hirano-ist.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<ViewTransitions>
			<html lang="ja">
				<body className={notoSansJp.className}>
					<AppProvider>
						<main className="flex h-screen flex-col justify-between">
							<div className="grow pb-4">{children}</div>
							<Footer />
						</main>
						<Toaster />
					</AppProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
