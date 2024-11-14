"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { searchUsers } from "@/features/profile/actions/search-users";
import type { Role } from "@prisma/client";
import type { Route } from "next";
import { Link, useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function SearchProfile() {
	const router = useTransitionRouter();
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
			params.set("username", searchString);
		} else {
			params.delete("username");
		}
		router.push(`?${params.toString()}`);
		await fetchSearchResults(searchString);
	}, 300);

	const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value;
		setSearchTerm(term);
		await debouncedSearch(term);
	};

	return (
		<div className="mx-auto max-w-5xl px-2">
			<div className="w-full">
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
								<CardContent>
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
