import { Badge } from "@/components/ui/badge";
import { Unauthorized } from "@/components/unauthorized";
import { checkSelfAuthOrRedirectToAuth } from "@/features/auth/utils/get-session";
import { checkAdminPermission } from "@/features/auth/utils/role";
import {
	getAllImages,
	getAllSlugs,
} from "@/features/markdown/actions/fetch-contents";
import { ContentStack } from "@/features/markdown/components/content-stack";
import { formatSlugsAndImages } from "@/features/markdown/utils/format";

const path = "notes";

export default async function Page() {
	await checkSelfAuthOrRedirectToAuth();

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
