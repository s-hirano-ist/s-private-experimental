"use client"; // Error components must be Client Components
import { ErrorView } from "@/components/error-view";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Page({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<html lang="ja">
			<body>
				<main>
					<div className="flex h-screen w-screen flex-col items-center justify-center space-y-4 text-center">
						<ErrorView />
						<Button variant="outline" onClick={() => reset()}>
							Try again
						</Button>
					</div>
				</main>
			</body>
		</html>
	);
}
