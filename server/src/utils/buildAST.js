const parseTokens = require('./parseTokes');
const tokenExtraction = require('./tokenExtraction');

function buildAST(ruleString) {
  let tokens = [];
  let idx = 0;

  // Tokenize the string manually
  while (idx < ruleString.length) {
    let [token, nextIdx] = tokenExtraction(ruleString, idx);
    tokens.push(token);
    idx = nextIdx;
  }

  // Parse the tokens into an AST
  return parseTokens(tokens);
}

module.exports = buildAST;