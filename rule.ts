
import { NapiConfig, Rule, Lang } from "@ast-grep/napi"

export function getCounterRule({
    importOriginalNameRegex,
    importSourceRustRegex
}: {
    importOriginalNameRegex?: string,
    importSourceRustRegex?: string,
} = {}): NapiConfig {
    return {
        utils: {
            isAliasImport: {
                all: [
                    {
                        has: {
                            kind: "identifier",
                            pattern: "$ALIAS",
                            field: "alias",
                        },
                    },
                    {
                        has: {
                            kind: "identifier",
                            pattern: "$ORIGINAL_NAME",
                            field: "name",
                        },
                    },
                ],
            }
        },
        rule: {
            kind: "identifier",
            pattern: "$NAME",
            regex: importOriginalNameRegex,
            inside: {
                any: [
                    { kind: "jsx_opening_element" },
                    { kind: "jsx_self_closing_element" },
                ],
                inside: {
                    kind: "program",
                    stopBy: "end",
                    has: {
                        kind: "import_statement",
                        regex: importSourceRustRegex,
                        has: {
                            kind: "import_clause",
                            has: {
                                // TODO also support default import
                                kind: "named_imports",
                                has: {
                                    kind: "import_specifier",
                                    any: [
                                        {
                                            has: {
                                                kind: "identifier",
                                                pattern: "$NAME",
                                                field: "name",
                                            },
                                        },
                                        {
                                            matches: "isAliasImport"
                                        }
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        },
        language: Lang.Tsx
    }
}