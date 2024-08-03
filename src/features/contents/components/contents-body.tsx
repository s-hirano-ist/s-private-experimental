const ContentsBody = ({ content }: { content: string }) => {
	return (
		<div className="mx-2">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
};

export default ContentsBody;
