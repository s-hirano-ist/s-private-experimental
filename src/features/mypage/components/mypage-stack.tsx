"use client";
import { ContentStack } from "@/components/stack/content-stack";
import { LoadingStack } from "@/components/stack/loading-stack";
import { StatusCodeView } from "@/components/status-code-view";
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

	if (data === undefined) return <LoadingStack />;
	if (data.length === 0)
		return <StatusCodeView statusCode={204} statusMessage="No content" />;

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
