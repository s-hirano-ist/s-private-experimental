"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { queuedContentsContext } from "@/features/blog/stores/queued-contents-context";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import type { QueuedContent } from "../stores/queued-contents-context";

type Props = {
	queuedContents: QueuedContent[];
};

export function QueuedStack({ queuedContents }: Props) {
	const [data, setData] = useRecoilState(queuedContentsContext);

	useEffect(() => {
		setData(queuedContents);
	}, [queuedContents, setData]);

	return (
		<div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4">
			{data.map((d) => {
				return (
					<Link key={d.id} href={d.url} target="_blank">
						<Card className="hover:bg-primary/10">
							<CardHeader>
								<div className="flex gap-4">
									<Badge>{d.id}</Badge>
									<Badge variant="outline">{d.category}</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<CardTitle>{d.title}</CardTitle>
								<CardDescription className="truncate">
									{d.quote ? d.quote : "　"}
								</CardDescription>
							</CardContent>
						</Card>
					</Link>
				);
			})}
		</div>
	);
}
