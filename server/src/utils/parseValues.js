function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

function parseValue(value) {
    value = value.trim();
    if (value.startsWith("'") && value.endsWith("'")) {
      return value.slice(1, -1); 
    } else if (isNumber(value)) {
      return parseFloat(value); 
    }
    return value; 
  }

  module.exports = parseValue;