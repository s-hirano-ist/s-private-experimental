import { writeFile } from "node:fs/promises";
import dotenv from "dotenv";
import pkg from "pg";

const OUTPUT_PATH = "output";

type NewsDetail = {
	id: number;
	title: string;
	url: string;
	quote: string | null;
	category: string;
};

dotenv.config();

const { Pool } = pkg;

async function getConnection() {
	const pool = new Pool();
	const connection = await pool.connect();
	await connection.query("BEGIN");
	return { pool, connection };
}
type OutputType = {
	[key: string]: {
		title: string;
		quote: string;
		url: string;
	}[];
};

function categorizeNewsDetails(newsDetails: NewsDetail[]): OutputType {
	return newsDetails.reduce((acc, newsDetail) => {
		if (!acc[newsDetail.category]) acc[newsDetail.category] = [];
		const { title, quote, url } = newsDetail;
		acc[newsDetail.category].push({ title, quote: quote ?? "", url });
		return acc;
	}, {} as OutputType);
}

async function exportData(data: OutputType) {
	for (const [key, value] of Object.entries(data)) {
		console.log(`Key: ${key}`);
		const jsonData = JSON.stringify(value, null, 2);
		await writeFile(`${OUTPUT_PATH}/${key}.json`, jsonData);
	}
}

const { pool, connection } = await getConnection();
try {
	const res = await connection.query(
		"SELECT nd.id, nd.title, nd.url, nd.quote, c.category FROM news_detail nd JOIN category c ON nd.category_id = c.id WHERE nd.status = $1;",
		["UNEXPORTED"],
	);
	console.log("📊 データを取得しました。");

	const rows = res.rows as NewsDetail[];
	const out = categorizeNewsDetails(rows);
	await exportData(out);

	console.log("💾 データがdata.jsonに書き出されました。");

	await connection.query("COMMIT");
} catch (error) {
	await connection.query("ROLLBACK");
	console.error("❌ エラーが発生しました:", error);
} finally {
	try {
		connection.release();
		pool.end();
		console.log("🔚 データベース接続が終了しました。");
	} catch (endError) {
		console.error("⚠️ 接続終了時にエラーが発生しました:", endError);
	}
}
