export const sanitizeHref = (url: string): string => {
	if (/^https?:\/\//.exec(url)) {
		return url;
	}
	console.error("Detected url which is not HTTPS.");
	return "NON URL STRING";
};
