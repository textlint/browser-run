import { browserRun } from "../src/browser-run";

describe("browser-run", () => {
    it("should work", () => {
        const ruleFile = require.resolve("./fixtures/rule.js");
        return browserRun({
            input: "test text.",
            inputFilePath: "README.md",
            ruleFilePath:ruleFile,
            ruleId: "test-rule"
        })
    });
});
