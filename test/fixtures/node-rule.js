const fs = require("fs");
module.exports = (context) => {
    const { Syntax, report, RuleError } = context;
    const text = fs.readFileSync("./README.md", "utf-8");
    return {
        [Syntax.Paragraph](node) {
            report(node, new RuleError(text));
        }
    };
};
