"use client";

import { ContentStack } from "@/components/table/content-stack";
import { newsDetailContext } from "@/features/blog/stores/news-detail-context";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import type { NewsDetailContext } from "../stores/news-detail-context";

type Props = {
	newsDetail: NewsDetailContext[];
};

export function NewsDetailStack({ newsDetail }: Props) {
	const [data, setData] = useRecoilState(newsDetailContext);

	useEffect(() => {
		setData(newsDetail);
	}, [newsDetail, setData]);

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
