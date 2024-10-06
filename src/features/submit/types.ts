export type Status = {
	unexported: number;
	recentlyUpdated: number;
	exported: number;
};

export type Change = "UPDATE" | "REVERT";
