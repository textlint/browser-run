import * as fs from "fs";
import {
    FAIL_MARK,
    GenerateCodeOptions,
    generatePresetCodeStream,
    generateRuleCodeStream,
    isGenerateCodeRule
} from "./code-generator";

import browserify from "browserify";

const browser = require("browser-run");
export const browserRun = (options: GenerateCodeOptions & { cwd: string }) => {
    const readable = isGenerateCodeRule(options)
        ? generateRuleCodeStream({
            ruleId: options.ruleId,
            ruleFilePath: options.ruleFilePath,
            inputFilePath: options.inputFilePath,
            input: fs.readFileSync(options.inputFilePath, "utf-8")
        })
        : generatePresetCodeStream({
            presetFilePath: options.presetFilePath,
            inputFilePath: options.inputFilePath,
            input: fs.readFileSync(options.inputFilePath, "utf-8")
        });
    return new Promise((resolve, reject) => {
        const destination = browser();
        browserify(readable, { basedir: options.cwd })
            .bundle()
            .pipe(destination)
            .pipe(process.stdout);
        destination.on("data", (chunk: any) => {
            const data = String(chunk);
            if (data.includes(FAIL_MARK)) {
                reject(new Error(data));
            }
        });
        destination.on("end", (error: Error) => {
            if (error) {
                return reject(error);
            } else {
                return resolve();
            }
        });
    });
};
