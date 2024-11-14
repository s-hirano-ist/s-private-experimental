export function sanitizeFileName(fileName: string) {
	return fileName.replace(/[^a-zA-Z0-9._-]/g, "");
}
