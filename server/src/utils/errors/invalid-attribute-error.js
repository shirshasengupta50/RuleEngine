const RuleError = require('./rule-error');

class InvalidAttributeError extends RuleError {
    constructor(attribute) {
      super(`Invalid Attribute: '${attribute}' is not part of the valid catalog.`);
      this.name = 'InvalidAttributeError';
    }
}

module.exports =  InvalidAttributeError;