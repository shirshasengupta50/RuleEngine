const RuleError = require('./rule-error');

class SyntaxError extends RuleError {
    constructor(message) {
      super(`Syntax Error: ${message}`);
      this.name = "SyntaxError";
    }
}

module.exports = SyntaxError;