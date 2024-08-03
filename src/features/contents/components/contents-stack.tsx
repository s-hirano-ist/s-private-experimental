import { ContentsPreview } from "./contents-preview";

// TODO: blogとかのcontents stackと統一する
export function ContentsStack({
	slugs,
	noImage = false,
}: { slugs: string[]; noImage?: boolean }) {
	return (
		<div className="my-2 grid grid-cols-2 gap-4 px-2 sm:grid-cols-4">
			{slugs.map((slug) => (
				<div key={slug}>
					<ContentsPreview slug={slug} noImage={noImage} />
				</div>
			))}
		</div>
	);
}
