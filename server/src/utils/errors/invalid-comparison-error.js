const RuleError = require('./rule-error');

class InvalidComparisonError extends RuleError {
    constructor(left, right) {
      super(`Invalid Comparison: Cannot compare '${left}' with '${right}'.`);
      this.name = "InvalidComparisonError";
    }
}

module.exports = InvalidComparisonError;