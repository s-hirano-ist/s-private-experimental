const ContentsBody = ({
	content,
}: { content: JSX.Element | JSX.Element[] | string }) => {
	return (
		<div className="prose prose-sm mx-auto p-2 sm:prose-base">{content}</div>
	);
};

export default ContentsBody;
