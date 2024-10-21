const parseTokens = require('./parseTokes');

const buildAST = (ruleString) => {
    let tokens = [];
    let idx = 0;
  
    while (idx < ruleString.length) {
      let [token, nextIdx] = tokenExtraction(ruleString, idx);
      tokens.push(token);
      idx = nextIdx;
    }
  
    return parseTokens(tokens);
};

module.exports = buildAST;