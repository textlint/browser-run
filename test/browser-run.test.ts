import { browserRun } from "../src/browser-run";
import * as path from "path";

describe("browser-run", () => {
    it("should work", () => {
        const ruleFile = require.resolve("./fixtures/rule.js");
        return browserRun({
            input: path.join(__dirname, "fixtures/README.md"),
            inputFilePath: path.join(__dirname, "fixtures/README.md"),
            ruleFilePath: ruleFile,
            ruleId: "test-rule"
        });
    });
});
