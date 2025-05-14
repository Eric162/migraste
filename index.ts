
import { getCounterRule } from "./rule"
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
        }

        results.forEach((result) => {
            console.log("ORIGINAL_NAME", result.getMatch("ORIGINAL_NAME")?.text())
            console.log("NAME", result.getMatch("NAME")?.text())
            console.log("ALIAS", result.getMatch("ALIAS")?.text())
            console.log("SOURCE", result.getMatch("SOURCE")?.text())
        })
    })
})()