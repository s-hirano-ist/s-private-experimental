type Action = {
	success: boolean;
	message: string;
};

export type ServerAction<T> =
	| (Action & { success: true; data: T })
	| (Action & { success: false });

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
