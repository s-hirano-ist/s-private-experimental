import { ContentsPreview } from "./contents-preview";

export function ContentsStack({
	path,
	data,
}: { path: string; data: Record<string, string> }) {
	return (
		<div className="my-2 grid grid-cols-2 items-stretch gap-4 px-2 sm:grid-cols-4">
			{Object.entries(data).map(([key, value]) => {
				return (
					<div key={key}>
						<ContentsPreview path={path} slug={key} imagePath={value} />
					</div>
				);
			})}
		</div>
	);
}
