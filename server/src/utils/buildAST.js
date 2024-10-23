const parseTokens = require('./parseTokes');
const tokenExtraction = require('./tokenExtraction');
const { SyntaxError } = require('./errors/index');

function buildAST(ruleString) {

  if (!ruleString || typeof ruleString !== 'string') {
    throw new SyntaxError("Rule string is empty or invalid.");
  }

  let tokens = [];
  let idx = 0;

  try {
    while (idx < ruleString.length) {
      let [token, nextIdx] = tokenExtraction(ruleString, idx);
      tokens.push(token);
      idx = nextIdx;
    }
  } catch (error) {
    throw new SyntaxError(`Error while tokenizing rule: ${error.message}`);
  }

  return parseTokens(tokens);
}

module.exports = buildAST;