import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/app-provider";
import { Footer } from "@/components/nav/footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import { type ReactNode, Suspense } from "react";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dump",
	description: "Dump blog data to GitHub",
};

export default async function RootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	try {
		return (
			<ViewTransitions>
				<html lang="ja">
					<body className={notoSansJp.className}>
						<AppProvider>
							<main className="flex h-screen flex-col justify-between">
								<div className="grow pb-4">{children}</div>
								<Suspense fallback={<div />}>
									<Footer />
								</Suspense>
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
