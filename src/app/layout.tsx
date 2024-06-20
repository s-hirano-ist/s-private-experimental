import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/app-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import type { ReactNode } from "react";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dump",
	description: "Dump blog data to GitHub",
};

export default function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<ViewTransitions>
			<html lang="ja">
				<body className={notoSansJp.className}>
					<AppProvider>
						<main className="flex min-h-screen flex-col items-center justify-between p-4">
							{children}
						</main>
						<Analytics debug={false} />
						<Toaster />
					</AppProvider>
				</body>
			</html>
		</ViewTransitions>
	);
}
