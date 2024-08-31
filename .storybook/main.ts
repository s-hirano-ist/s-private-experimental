import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"@storybook/addon-coverage",
		"@storybook/addon-a11y",
		"@storybook/addon-themes",
		"@storybook/addon-interactions",
		"@storybook/addon-storysource",
		"storybook-dark-mode",
		// "@storybook/addon-cssresources",
		// "storybook-addon-performance",
		// "@storybook/addon-google-analytics",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	staticDirs: ["../public"],
};
export default config;
