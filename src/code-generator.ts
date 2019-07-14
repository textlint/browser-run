import jsesc = require("jsesc");
import { Readable } from "stream";
/**
 * Generate code that run textlint rule preset
 * @param options
 */
const generateRulePresetCode = (options: GenerateCodePreset) => {
    return `
const { TextlintKernel } = require("@textlint/kernel");
const textlint = new TextlintKernel();
const formatter = require("@textlint/linter-formatter/lib/linter-formatter/src/formatters/stylish.js").default;
const presetModule = require("${jsesc(options.presetFilePath)}");
const preset = presetModule.default ? presetModule.default : presetModule;
textlint.lintText("${jsesc(options.input)}", {
    filePath: "${jsesc(options.inputFilePath)}",
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
const rule = require("${jsesc(options.ruleFilePath)}");
textlint.lintText("${jsesc(options.input)}", {
    filePath: "${jsesc(options.inputFilePath)}",
    ext: ".md",
    plugins: [
        {
            pluginId: "markdown",
            plugin: require("@textlint/textlint-plugin-markdown")
        }
    ],
    rules: [
        {
            ruleId: "${jsesc(options.ruleId)}",
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
