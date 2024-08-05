const ContentsBody = ({ content }: { content: string }) => {
	return (
		<div className="prose mx-auto">
			<div dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
};

export default ContentsBody;
