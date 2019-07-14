import meow = require("meow");
import * as path from "path";
import * as fs from "fs";
import { browserRun } from "./browser-run";

export const run = () => {
    const cli = meow(`
    Usage
      $ npx @textlint/browser-run <input-file-path>
 
    Options
      --ruleId rule id. Default: test-rule 
      --rule file path to rule module entry
      
      --preset file path to rule preset module entry
 
    Examples
      $ npx @textlint/browser-run --rule ./lib/rule.js ./README.md
      $ npx @textlint/browser-run --preset ./lib/rule-preset.js ./README.md
      
`, {
        flags: {
            preset: {
                type: "string"
            },
            rule: {
                type: "string"
            },
            ruleId: {
                type: "string"
            }
        },
        autoHelp: true,
        autoVersion: true
    });

    if (cli.input.length <= 0) {
        throw new Error("should pass input file path");
    }
    const inputFilePath = path.resolve(process.cwd(), cli.input[0]);
    if (!fs.existsSync(inputFilePath)) {
        throw new Error(`Input: Does not exist: ${inputFilePath}`);
    }
    if (cli.flags.rule) {
        const ruleEntryFilePath = path.resolve(process.cwd(), cli.flags.rule);
        if (!fs.existsSync(ruleEntryFilePath)) {
            throw new Error(`--rule: Does not exist: ${ruleEntryFilePath}`);
        }
        return browserRun({
            ruleId: cli.flags.ruleId,
            ruleFilePath: ruleEntryFilePath,
            inputFilePath: inputFilePath,
            input: inputFilePath
        });
    } else if (cli.flags.preset) {
        const rulePresetEntryFilePath = path.resolve(process.cwd(), cli.flags.preset);
        if (!fs.existsSync(rulePresetEntryFilePath)) {
            throw new Error(`--preset: Does not exist: ${rulePresetEntryFilePath}`);
        }
        return browserRun({
            presetFilePath: rulePresetEntryFilePath,
            inputFilePath: inputFilePath,
            input: inputFilePath
        });
    }
    return Promise.resolve();
};
