module.exports = (context) => {
    const { Syntax, report, RuleError } = context;
    return {
        [Syntax.Str](node) {
            report(node, new RuleError("message"));
        }
    };
};
