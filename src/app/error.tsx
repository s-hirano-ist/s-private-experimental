"use client"; // Error components must be Client Components
import ErrorPage from "@/components/error";
import { useEffect } from "react";

export default function Page({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return <ErrorPage />;
}
