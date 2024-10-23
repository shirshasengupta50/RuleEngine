const RuleError = require('./rule-error');

class InvalidOperatorError extends RuleError {
    constructor(operator) {
      super(`Invalid Operator: '${operator}' is not a valid operator.`);
      this.name = "InvalidOperatorError";
    }
}

module.exports = InvalidOperatorError;