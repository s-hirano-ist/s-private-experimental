import "server-only";
import { env } from "@/env.mjs";
import { LineNotifyError } from "@/error-classes";

export async function sendLineNotifyMessage(message: string) {
	try {
		const LINE_NOTIFY_URL = env.LINE_NOTIFY_URL;
		const LINE_NOTIFY_SECRET_TOKEN = env.LINE_NOTIFY_SECRET_TOKEN;

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
		if (result.status !== 200) throw new LineNotifyError();
	} catch (error) {
		console.error("Send line message failed with error", error);
	}
}
