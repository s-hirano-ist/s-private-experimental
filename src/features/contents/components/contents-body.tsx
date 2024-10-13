"use client";
type Props = {
	content: JSX.Element | JSX.Element[] | string;
};

export function ContentsBody({ content }: Props) {
	return (
		<div className="prose prose-sm mx-auto p-2 sm:prose-base">{content}</div>
	);
}
