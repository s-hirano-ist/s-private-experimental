module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["next/core-web-vitals", "plugin:tailwindcss/recommended"],
	plugins: ["tailwindcss"],
};

// TODO: add more eslint settings
// module.exports = {
// 	extends: [
// 	  "next/core-web-vitals",
// 	  "eslint:recommended",
// 	  "next",
// 	  "plugin:@typescript-eslint/recommended-type-checked",
// 	  "plugin:@typescript-eslint/stylistic-type-checked",
// 	  "plugin:react/recommended",
// 	  "plugin:react-hooks/recommended",
// 	  "plugin:@next/next/recommended",
// 	  "plugin:import/recommended",
// 	  "plugin:import/typescript",
// 	  "prettier",
// 	],
// 	parser: "@typescript-eslint/parser",
// 	parserOptions: {
// 	  ecmaVersion: "latest",
// 	  project: ["./tsconfig.json"],
// 	},
// 	plugins: ["import", "react", "jsx-a11y", "unused-imports"],
// 	rules: {
// 	  "@typescript-eslint/no-misused-promises": [
// 		2,
// 		{
// 		  checksVoidReturn: { attributes: false },
// 		},
// 	  ],
// 	  "react-hooks/rules-of-hooks": "off",
// 	  "react-hooks/exhaustive-deps": "warn",
// 	  "react/react-in-jsx-scope": "off",
// 	  "react/prop-types": "off",
// 	  "@next/next/no-img-element": "off",
// 	  "no-console": ["warn", { allow: ["error"] }],
// 	  "no-restricted-imports": ["error", { patterns: ["./", "../"] }],
// 	  "@typescript-eslint/no-unused-vars": [
// 		"warn",
// 		{
// 		  argsIgnorePattern: "^_",
// 		  varsIgnorePattern: "^_",
// 		  caughtErrorsIgnorePattern: "^_",
// 		},
// 	  ],
// 	  "import/order": [
// 		"error",
// 		{
// 		  groups: ["builtin", "external", "parent", "sibling", "index"],
// 		  pathGroupsExcludedImportTypes: [],
// 		  alphabetize: { order: "asc" },
// 		  "newlines-between": "never",
// 		},
// 	  ],
// 	  "@typescript-eslint/consistent-type-definitions": ["error", "type"],
// 	  // FIXME:
// 	  "@typescript-eslint/no-unsafe-call": "off",
// 	  "@typescript-eslint/no-unsafe-assignment": "off",
// 	  "@typescript-eslint/no-unsafe-member-access": "off",
// 	},
// 	root: true,
// 	settings: {
// 	  "import/resolver": {
// 		node: {
// 		  extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
// 		  moduleDirectory: ["node_modules", "src/"],
// 		},
// 	  },
// 	},
//   };
