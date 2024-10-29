import { Badge } from "@/components/ui/badge";
import { Unauthorized } from "@/components/unauthorized";
import { checkAdminPermission } from "@/features/auth/utils/role";
import {
	getAllImages,
	getAllSlugs,
} from "@/features/contents/actions/fetch-contents";
import { ContentStack } from "@/features/contents/components/content-stack";
import { formatSlugsAndImages } from "@/features/contents/utils/format";

const path = "notes";

export default async function Page() {
	const hasAdminPermission = await checkAdminPermission();

	const slugs = getAllSlugs(path);
	const images = getAllImages(path);

	return (
		<>
			{hasAdminPermission ? (
				<>
					<Badge className="m-2 flex justify-center">
						ノート数: {slugs.length}
					</Badge>
					<ContentStack
						path={path}
						data={formatSlugsAndImages(slugs, images)}
					/>
				</>
			) : (
				<Unauthorized />
			)}
		</>
	);
}
