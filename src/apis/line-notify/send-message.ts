import { ERROR_MESSAGES } from "@/features/blog/constants";

export async function sendLineNotifyMessage(message: string) {
	const LINE_NOTIFY_URL = process.env.LINE_NOTIFY_URL;
	const LINE_NOTIFY_SECRET_TOKEN = process.env.LINE_NOTIFY_SECRET_TOKEN;

	if (!LINE_NOTIFY_URL || !LINE_NOTIFY_SECRET_TOKEN)
		throw new Error(ERROR_MESSAGES.UNEXPECTED);

	const body = new URLSearchParams();
	body.append("message", message);

	const result = await fetch(LINE_NOTIFY_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Bearer ${LINE_NOTIFY_SECRET_TOKEN}`,
		},
		body,
	});
	if (result.status !== 200) throw new Error(ERROR_MESSAGES.LINE);
}
