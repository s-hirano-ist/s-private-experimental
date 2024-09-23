await import("./src/env.mjs");

//MEMO: scriptタグを利用する必要が出たときはnonceの利用推奨
// https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy#reading-the-nonce

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;`;

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { typedRoutes: true },
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: cspHeader.replace(/\n/g, ""),
					},
				],
			},
		];
	},
};

export default nextConfig;
