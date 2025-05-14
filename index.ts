
import { getCounterRule, SOURCE, ORIGINAL_NAME, NAME, ALIAS } from "./rule"
import { findInFiles, Lang } from "@ast-grep/napi"



(async () => {
    const rule = getCounterRule({
        importSourceRustRegex: "@mui/material|@prep/design-system",
    })

    // get dir from args
    const dir = process.argv[2]

    console.log('Matching files in', dir)


    await findInFiles(Lang.Tsx, {
        paths: [dir],
        matcher: rule,
    }, (err, results) => {
        if (err) {
            console.error(err)
            return;
        }

        const fileName = results[0].getRoot().filename();
        console.table(results.map((result) => {
            const source = result.getMatch(SOURCE)?.text();
            const originalName = result.getMatch(ORIGINAL_NAME)?.text();
            const name = result.getMatch(NAME)?.text();
            const alias = result.getMatch(ALIAS)?.text();

            return {
                fileName,
                source,
                name,
                alias,
                originalName,
            }
        }))

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
    })
})()