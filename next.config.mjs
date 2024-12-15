import { env } from "./src/env.mjs";
await import("./src/env.mjs");

// MEMO: scriptタグを利用する必要が出たときはnonceの利用推奨
// https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy#reading-the-nonce

// MEMO: その他のheadersについては下記参照
// https://nextjs.org/docs/pages/api-reference/next-config-js/headers

const cspHeader = `
    default-src 'self';
	connect-src 'self' https://www.google-analytics.com;
	script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
	img-src 'self' blob: data: https://localhost:9000 https://private.s-hirano.com:9000 https://www.googletagmanager.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    report-to csp-endpoint;
	`;

/** @type {import('next').NextConfig} */
export const nextConfig = {
	experimental: { typedRoutes: true },
	output: "standalone",
	images: { remotePatterns: [{ hostname: env.MINIO_HOST }] },
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Content-Security-Policy",
						value: cspHeader.replace(/\n/g, ""),
					},
				],
			},
		];
	},
};
