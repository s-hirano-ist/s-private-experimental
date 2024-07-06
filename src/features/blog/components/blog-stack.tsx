"use client";

import { ContentStack } from "@/components/table/content-stack";
import { blogContext } from "@/features/blog/stores/blog-context";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import type { BlogContext } from "../stores/blog-context";

type Props = {
	blog: BlogContext[];
};

export function BlogStack({ blog }: Props) {
	const [data, setData] = useRecoilState(blogContext);

	useEffect(() => {
		setData(blog);
	}, [blog, setData]);

	return (
		<div className="grid grid-cols-1 gap-2 bg-gradient-to-r from-primary to-primary-grad p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
			{data.map((d) => {
				return (
					<ContentStack
						key={d.id}
						id={d.id}
						title={d.title}
						quote={d.quote}
						url={d.url}
						category={d.category}
					/>
				);
			})}
		</div>
	);
}
