import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "s-private",
		short_name: "s-private",
		description: "Private pages and admin tools for s-hirano-ist.",
		lang: "ja",
		start_url: "/",
		theme_color: "#77a2c0",
		background_color: "#000",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
			},
		],
		display: "fullscreen",
	};
}
