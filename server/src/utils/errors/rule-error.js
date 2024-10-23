class RuleError extends Error {
    constructor(message) {
      super(message);
      this.name = "RuleError";
    }
}

module.exports = RuleError;