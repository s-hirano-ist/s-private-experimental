import "server-only";
import { env } from "@/env.mjs";
import * as Minio from "minio";

export const minioClient = new Minio.Client({
	endPoint: env.MINIO_HOST,
	port: env.MINIO_PORT,
	useSSL: false, //FIXME: use SSL true
	accessKey: env.MINIO_ACCESS_KEY,
	secretKey: env.MINIO_SECRET_KEY,
});