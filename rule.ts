import { Lang, type NapiConfig, type Rule } from "@ast-grep/napi";
import type { TypesMap } from "@ast-grep/napi/types/staticTypes";

export const SOURCE = "SOURCE";
export const ORIGINAL_NAME = "ORIGINAL_NAME";
export const NAME = "NAME";
export const PROPERTY_NAME = "PROPERTY_NAME";

enum Utils {
	aliasImport = "aliasImport",
	namedImport = "namedImport",
	defaultImport = "defaultImport",
	shortHandDestructure = "shortHandDestructure",
	jsxInvokation = "jsxInvokation",
}

const utils: Record<string, Rule<TypesMap>> = {
	[Utils.aliasImport]: {
		all: [
			{
				has: {
					kind: "identifier",
					pattern: `$${NAME}`,
					field: "alias",
				},
			},
			{
				has: {
					kind: "identifier",
					pattern: `$${ORIGINAL_NAME}`,
					field: "name",
				},
			},
		],
	},
	[Utils.namedImport]: {
		has: {
			kind: "identifier",
			pattern: `$${NAME}`,
			field: "name",
		},
	},
	[Utils.defaultImport]: {
		has: {
			kind: "import_clause",
			has: {
				kind: "identifier",
				pattern: `$${NAME}`,
			},
		},
	},
	[Utils.shortHandDestructure]: {
		has: {
			kind: "shorthand_property_identifier_pattern",
			stopBy: "end",
			pattern: `$${NAME}`,
			inside: {
				kind: "variable_declarator",
				stopBy: {
					kind: "object_pattern",
				},
			},
		},
	},
	[Utils.jsxInvokation]: {
		any: [
			{ kind: "jsx_opening_element" },
			{ kind: "jsx_self_closing_element" },
		],
	},
};

export function getCounterRule({
	importOriginalNameRegex,
	importSourceRustRegex,
}: {
	importOriginalNameRegex?: string;
	importSourceRustRegex?: string;
} = {}): NapiConfig {
	return {
		utils,
		rule: {
			kind: "identifier",
			pattern: `$${NAME}`,
			regex: importOriginalNameRegex,
			all: [
				{
					inside: {
						any: [
							{
								matches: Utils.jsxInvokation,
							},
							{
								kind: "member_expression",
								has: {
									kind: "property_identifier",
									pattern: `$${PROPERTY_NAME}`,
									stopBy: "end",
								},
								inside: {
									matches: Utils.jsxInvokation,
								},
							},
						],
					},
				},
				{
					inside: {
						kind: "program",
						stopBy: "end",
						has: {
							kind: "import_statement",
							all: [
								{
									regex: importSourceRustRegex,
									has: {
										kind: "string",
										stopBy: "end",
										has: {
											kind: "string_fragment",
											pattern: `$${SOURCE}`,
										},
									},
								},
								{
									any: [
										{
											matches: Utils.defaultImport,
										},
										{
											has: {
												kind: "named_imports",
												stopBy: "end",
												has: {
													kind: "import_specifier",
													stopBy: "end",
													any: [
														{
															matches: Utils.namedImport,
														},
														{
															matches: Utils.aliasImport,
														},
													],
												},
											},
										},
									],
								},
							],
						},
					},
				},
			],
		},
		language: Lang.Tsx,
	};
}
