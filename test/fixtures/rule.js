module.exports = (context) => {
    const { Syntax, report, RuleError } = context;
    return {
        [Syntax.Paragraph](node) {
            report(node, new RuleError("message"));
        }
    };
};
