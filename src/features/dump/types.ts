export type ContentName = "NEWS" | "CONTENTS" | "IMAGES";

export type Status = {
	unexported: number;
	recentlyUpdated: number;
	exported: number;
};

export type UpdateOrRevert = "UPDATE" | "REVERT";
