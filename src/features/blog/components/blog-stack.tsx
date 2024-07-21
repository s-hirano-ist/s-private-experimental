"use client";
import { ContentStack } from "@/components/stack/content-stack";
import { LoadingStack } from "@/components/stack/loading-stack";
import { StatusCodeView } from "@/components/status-code-view";
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

	if (data === undefined) return <LoadingStack />;
	if (data.length === 0) return <StatusCodeView statusCode="204" />;

	return (
		<div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
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
