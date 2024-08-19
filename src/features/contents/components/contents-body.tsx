const ContentsBody = ({ content }: { content: string }) => {
	return (
		<div className="prose prose-sm mx-auto p-2 sm:prose-base">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
};

export default ContentsBody;
