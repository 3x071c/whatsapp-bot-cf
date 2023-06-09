/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
const config = {
	env: {
		es2022: true,
	},
	extends: ["eslint:recommended", "airbnb-base", "plugin:prettier/recommended"],
	overrides: [
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:@typescript-eslint/strict",
				"airbnb-typescript/base",
				"plugin:prettier/recommended",
			],
			files: ["*.{tsx,ts}"],
			parserOptions: {
				ecmaFeatures: {
					impliedStrict: true,
				},
				parser: "@typescript-eslint/parser",
				project: ["./tsconfig.json"],
				sourceType: "module",
				tsconfigRootDir: __dirname /* This line is the only reason why the entire file is JS :vomiting_face: */,
				warnOnUnsupportedTypeScriptVersion: true,
			},
			plugins: ["@typescript-eslint"],
			rules: {
				"@typescript-eslint/consistent-type-definitions": ["warn", "type"],
				"@typescript-eslint/no-non-null-assertion":
					"off" /* Required as TypeScript doesn't recognize complex type assertions */,
			},
		},
		{
			files: ["*.{tsx,ts}"],
			parser: "@typescript-eslint/parser",
		},
	],
	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true,
		},
		sourceType: "module",
	},
	plugins: ["import"],
	root: true,
	rules: {
		/* Shared Rules for both JS and TS */
		"import/no-cycle": "off" /* False positives :*( A litte too conservative with ES6 modules */,
		"import/order": [
			"warn",
			{
				alphabetize: {
					order: "asc",
				},
				groups: ["type", "builtin", "external", "internal", "parent", "sibling", "index", "object", "unknown"],
				pathGroups: [
					{
						group: "internal",
						pattern: "~**",
						position: "before",
					},
				],
			},
		] /* Custom settings */,
		"import/prefer-default-export": "off" /* This makes no sense */,
		"no-cond-assign": ["error", "except-parens"] /* Added 'except-parens' option */,
		"no-console": "off" /* Console app */,
		"no-dupe-else-if": "warn" /* airbnb: not enabled yet */,
		"no-empty": ["error", { allowEmptyCatch: true }] /* airbnb: added allowEmptyCatch option */,
		"no-import-assign": "warn" /* airbnb: not enabled yet */,
		"no-restricted-exports": "off",
		"no-void": "off" /* False positives + outdated */,
		"require-await": "error" /* Prevent unnecessary async functions */,
		"sort-keys": "warn" /* sort object keys */,
		"sort-vars": "warn" /* sort variable declarations */,
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".tsx", ".ts"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code
			},
		},
	},
};
module.exports = config;
