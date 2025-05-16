#!/usr/bin/env node
import { Lang, findInFiles } from "@ast-grep/napi";
import { NAME, ORIGINAL_NAME, SOURCE, getCounterRule } from "./rule";

(async () => {
	const rule = getCounterRule({
		importSourceRustRegex: "@mui/material|@prep/design-system",
	});

	// get dir from args
	const dir = process.argv[2] || ".";

	console.log("Matching files in", dir);

	await findInFiles(
		Lang.Tsx,
		{
			paths: [dir],
			matcher: rule,
		},
		(err, results) => {
			if (err) {
				console.error(err);
				return;
			}

			const fileName = results[0].getRoot().filename();
			console.table(
				results.map((result) => {
					const source = result.getMatch(SOURCE)?.text();
					const originalName = result.getMatch(ORIGINAL_NAME)?.text();
					const nameOrAlias = result.getMatch(NAME)?.text();

					const name = originalName ?? nameOrAlias;
					const alias = originalName ? nameOrAlias : undefined;

					return {
						fileName,
						source,
						name,
						alias,
					};
				}),
			);

			// for (const result of results) {
			//     const source = result.getMatch("SOURCE")?.text();
			//     const originalName = result.getMatch("ORIGINAL_NAME")?.text();
			//     const name = result.getMatch("NAME")?.text();
			//     const alias = result.getMatch("ALIAS")?.text();

			//     console.log("ORIGINAL_NAME", originalName)
			//     console.log("NAME", name)
			//     console.log("ALIAS", alias)
			//     console.log("SOURCE", source)
			// }
		},
	);
})();
