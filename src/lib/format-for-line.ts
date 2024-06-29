import type { ChangeStatus } from "@/apis/prisma/change-status";

export function formatChangeStatusMessage({
	unexported,
	recentlyUpdated,
	exported,
}: ChangeStatus) {
	return `UPDATED: \nunexported: ${unexported}\nrecentlyUpdated: ${recentlyUpdated}\nexported: ${exported}`;
}
