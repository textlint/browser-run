import jsesc = require("jsesc");
import { Readable } from "stream";

const escapeStringLiteral = (string: string) => {
    return jsesc(string, {
        quotes: "double"
    });
};
export const FAIL_MARK = "________________THIS_RULE_DOES_NOT_WORK_ON_BROWSER________________";
/**
 * Generate code that run textlint rule preset
 * @param options
 */
const generateRulePresetCode = (options: GenerateCodePreset) => {
    return `
const { TextlintKernel } = require("@textlint/kernel");
const textlint = new TextlintKernel();
const formatter = require("@textlint/linter-formatter/lib/linter-formatter/src/formatters/stylish.js").default;
const presetModule = require("${escapeStringLiteral(options.presetFilePath)}");
const preset = presetModule.default ? presetModule.default : presetModule;
textlint.lintText("${escapeStringLiteral(options.input)}", {
    filePath: "${escapeStringLiteral(options.inputFilePath)}",
    ext: ".md",
    plugins: [
        {
            pluginId: "markdown",
            plugin: require("@textlint/textlint-plugin-markdown")
        }
    ],
    rules: Object.keys(preset.rules).map(ruleId => ({ ruleId: ruleId, rule: preset.rules[ruleId], options: preset.rulesConfig[ruleId] }))
}).then(result => {
    console.log("Output:");
    console.log(formatter([result]));
    console.log("JSON:");
    console.log(JSON.stringify(result, null, 4));
}).catch(error => {
    console.error(error);
    console.error("${escapeStringLiteral(FAIL_MARK)}");
}).finally(() => {
    window.close();
})`;
};
/**
 * Generate code that run textlint rule
 * @param options
 */
const generateRuleCode = (options: GenerateCodeRule) => {
    return `
const { TextlintKernel } = require("@textlint/kernel");
const textlint = new TextlintKernel();
const formatter = require("@textlint/linter-formatter/lib/linter-formatter/src/formatters/stylish.js").default;
const rule = require("${escapeStringLiteral(options.ruleFilePath)}");
textlint.lintText("${escapeStringLiteral(options.input)}", {
    filePath: "${escapeStringLiteral(options.inputFilePath)}",
    ext: ".md",
    plugins: [
        {
            pluginId: "markdown",
            plugin: require("@textlint/textlint-plugin-markdown")
        }
    ],
    rules: [
        {
            ruleId: "${escapeStringLiteral(options.ruleId)}",
            rule: rule.default ? rule.default : rule
        }
    ]
}).then(result => {
    console.log("Output:");
    console.log(formatter([result]));
    console.log("JSON:");
    console.log(JSON.stringify(result, null, 4));
}).catch(error => {
    console.error(error);
    console.error("${escapeStringLiteral(FAIL_MARK)}");
}).finally(() => {
    window.close();
})`;
};

export type GenerateCodePreset = {
    input: string;
    inputFilePath: string;
    presetFilePath: string;
};
export type GenerateCodeRule = {
    input: string;
    inputFilePath: string;
    ruleId: string;
    ruleFilePath: string;
};

export type GenerateCodeOptions = GenerateCodeRule | GenerateCodePreset

export const isGenerateCodeRule = (v: any): v is GenerateCodeRule => {
    return v.ruleFilePath !== undefined;
};
export const generatePresetCodeStream = (options: GenerateCodePreset) => {
    const stream = new Readable();
    stream.push(generateRulePresetCode(options));
    stream.push(null);
    return stream;
};

export const generateRuleCodeStream = (options: GenerateCodeRule) => {
    const stream = new Readable();
    stream.push(generateRuleCode(options));
    stream.push(null);
    return stream;
};
