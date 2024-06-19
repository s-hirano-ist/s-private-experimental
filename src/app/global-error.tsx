"use client"; // Error components must be Client Components
import ErrorPage from "@/components/error";
import { useEffect } from "react";

export default function Page({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<html lang="ja">
			<body>
				<ErrorPage />
			</body>
		</html>
	);
}
