import { browserRun } from "../src/browser-run";
import * as path from "path";
import * as fs from "fs";

describe("browser-run", () => {
    it("should work", () => {
        const ruleFile = require.resolve("./fixtures/rule.js");
        return browserRun({
            input: fs.readFileSync(path.join(__dirname, "fixtures/README.md"), "utf-8"),
            inputFilePath: path.join(__dirname, "fixtures/README.md"),
            ruleFilePath: ruleFile,
            ruleId: "test-rule",
            cwd: __dirname
        });
    });
    it("should not work", () => {
        const ruleFile = require.resolve("./fixtures/node-rule.js");
        return browserRun({
            input: fs.readFileSync(path.join(__dirname, "fixtures/README.md"), "utf-8"),
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
