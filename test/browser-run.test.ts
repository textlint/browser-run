import { browserRun } from "../src/browser-run";
import * as path from "path";

describe("browser-run", () => {
    it("should work", () => {
        const ruleFile = require.resolve("/Users/azu/.ghq/github.com/textlint-ja/textlint-rule-no-nfd/lib/textlint-rule-no-nfd.js");
        return browserRun({
            input: path.join(__dirname, "fixtures/README.md"),
            inputFilePath: path.join(__dirname, "fixtures/README.md"),
            ruleFilePath: ruleFile,
            ruleId: "test-rule",
            cwd: __dirname
        });
    });
    it("should not work", () => {
        const ruleFile = require.resolve("./fixtures/node-rule.js");
        return browserRun({
            input: path.join(__dirname, "fixtures/README.md"),
            inputFilePath: path.join(__dirname, "fixtures/README.md"),
            ruleFilePath: ruleFile,
            ruleId: "test-rule",
            cwd: __dirname
        }).then(() => {
            throw new Error("should not call");
        }).catch(() => {
            // pass
            return;
        });
    });
});
