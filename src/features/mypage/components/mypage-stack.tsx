"use client";

import { ContentStack } from "@/components/table/content-stack";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { type MypageContext, mypageContext } from "../stores/mypage-context";

type Props = {
	mypage: MypageContext[];
};

export function MypageStack({ mypage }: Props) {
	const [data, setData] = useRecoilState(mypageContext);

	useEffect(() => {
		setData(mypage);
	}, [mypage, setData]);

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
					/>
				);
			})}
		</div>
	);
}
