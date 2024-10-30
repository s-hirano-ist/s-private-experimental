"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { searchUsers } from "@/features/profile/actions/search-users";
import { ProfileContents } from "@/features/profile/components/profile-contents";
import type { Role } from "@prisma/client";
import type { Route } from "next";
import { Link } from "next-view-transitions";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Page() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState(
		searchParams.get("username") ?? "",
	);
	const [searchResults, setSearchResults] = useState<
		{
			username: string;
			role: Role;
		}[]
	>([]);

	// const viewStatus = await checkViewStatus();

	const fetchSearchResults = useCallback(async (searchString: string) => {
		if (searchString === "") {
			setSearchResults([]);
			return;
		}
		const users = await searchUsers(searchString);
		setSearchResults(users);
	}, []);

	const debouncedSearch = useDebouncedCallback(async (searchString: string) => {
		const params = new URLSearchParams(searchParams);
		if (searchString) {
			params.set("q", searchString);
		} else {
			params.delete("q");
		}
		router.push(`?${params.toString()}`);
		await fetchSearchResults(searchString);
	}, 300);

	// for initial load and when search parameter changes
	useEffect(() => {
		const searchString = searchParams.get("q") ?? "";
		setSearchTerm(searchString);
		void fetchSearchResults(searchString);
	}, [searchParams, fetchSearchResults]);

	const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		await debouncedSearch(term);
	};

	return (
		<div className="mx-auto max-w-5xl sm:px-2">
			<div className="container mx-auto p-4">
				<Input
					type="search"
					placeholder="プロフィールを検索..."
					value={searchTerm}
					onChange={handleSearchChange}
					className="mb-4"
				/>
				<div className="space-y-4">
					{searchResults.map((result) => (
						<Link
							// eslint-disable-next-line
							href={`/profile/${result.username}` as Route}
							key={result.username}
						>
							<Card>
								<CardContent className="p-4">
									<p>{result.username}</p>
									<p>{result.role}</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
