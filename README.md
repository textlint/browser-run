# @textlint/browser-run

Run textlint rule on browser for testing.

## Purpose

If you want to know whether your textlint rule work or not, This Command line tool help you.

This tools did following steps:

1. Bundle your textlint rule and [@textlint/kernel](https://github.com/textlint/textlint/tree/master/packages/%40textlint/kernel) by [Browserify](http://browserify.org/) 
2. Run the bundle code on Electron browser by [browser-run](https://github.com/juliangruber/browser-run)
3. Output results

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @textlint/browser-run --global

## Usage

    Usage
      $ npx @textlint/browser-run <input-file-path>
 
    Options
      --ruleId rule id. Default: test-rule 
      --rule file path to rule module entry
      
      --preset file path to rule preset module entry
 
    Examples
      $ npx @textlint/browser-run --rule ./lib/rule.js ./README.md
      $ npx @textlint/browser-run --preset ./lib/rule-preset.js ./README.md

**Notes**

You should specify rule file that is build by [textlint-scripts](https://github.com/textlint/textlint-scripts). 

## Node Module

```js
import * as path from "path"
import { browserRun } from "@textlint/browser-run";

const ruleFile = require.resolve("./fixtures/rule.js");
browserRun({
    input: path.join(__dirname, "fixtures/README.md"),
    inputFilePath: path.join(__dirname, "fixtures/README.md"),
    ruleFilePath: ruleFile,
    ruleId: "test-rule",
    cwd: __dirname
}).then(() => {
    console.log("Work");
}).catch(error => {
    console.log("Does not work")
});
```

## Changelog

See [Releases page](https://github.com/textlint/browser-run/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint/browser-run/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
