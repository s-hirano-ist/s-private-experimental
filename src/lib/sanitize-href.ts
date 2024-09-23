export const sanitizeHref = (url: string): string => {
	if (/^https?:\/\//.exec(url)) return url;
	throw new Error("Detected url which is not HTTPS");
};

/* 下記のような対策でもOK
const urlObj = new URL(url);
if (urlObj.protocol === "http:" || urlObj.protocol === "https:") {
}
*/
