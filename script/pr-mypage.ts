import { access, readFile, writeFile } from "node:fs/promises";
import dotenv from "dotenv";
import pkg from "pg";

type Mypage = {
	id: number;
	title: string;
	quote: string;
	url: string;
};

dotenv.config();

const OUTPUT_PATH = process.env.MYPAGE_OUTPUT_PATH;

const { Pool } = pkg;

async function getConnection() {
	// const pool = new Pool();
	const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
	const connection = await pool.connect();
	await connection.query("BEGIN");
	return { pool, connection };
}

async function exportData(data: Mypage[]) {
	try {
		let originalData = await readFile(OUTPUT_PATH ?? "", "utf8");
		originalData += `\n## ${new Date()}\n`;
		data.map((d) => {
			originalData += `\n### ${d.title}\n\n${d.quote}\n\n[${d.url}](${d.url})\n`;
		});
		await writeFile(OUTPUT_PATH ?? "", originalData);
	} catch (error) {
		// ファイルが存在しない
		throw new Error(`No file named ${OUTPUT_PATH}`);
	}
}

const { pool, connection } = await getConnection();
try {
	const mypage = (
		await connection.query("SELECT * FROM mypage WHERE status = $1;", [
			"UNEXPORTED",
		])
	).rows as Mypage[];
	console.log("mypage", mypage);
	console.log("📊 データを取得しました。");

	await exportData(mypage);

	console.log("💾 データがdata.jsonに書き出されました。");

	await connection.query("COMMIT");
} catch (error) {
	await connection.query("ROLLBACK");
	console.error("❌ エラーが発生しました:", error);
} finally {
	try {
		connection.release();
		await pool.end();
		console.log("🔚 データベース接続が終了しました。");
	} catch (endError) {
		console.error("⚠️ 接続終了時にエラーが発生しました:", endError);
	}
}
