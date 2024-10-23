function tokenExtraction(ruleString, startIdx) {
  let i = startIdx;

  while (i < ruleString.length && ruleString[i] === ' ') {
    i++;
  }

  if (ruleString[i] === '(' || ruleString[i] === ')') {
    return [ruleString[i], i + 1];
  }

  if (ruleString[i] === '>' || ruleString[i] === '<' || ruleString[i] === '=' || ruleString[i] === '!') {
    let j = i + 1;
    if (ruleString[j] === '=') {
      return [ruleString[i] + ruleString[j], j + 1]; 
    }
    return [ruleString[i], i + 1]; 
  }

  let j = i;
  if (ruleString[j] === "'") {

    j++;
    while (j < ruleString.length && ruleString[j] !== "'") {
      j++;
    }
    return [ruleString.slice(i, j + 1), j + 1]; 
  }

  while (j < ruleString.length && ruleString[j] !== ' ' && ruleString[j] !== '(' && ruleString[j] !== ')') {
    j++;
  }

  return [ruleString.slice(i, j), j];
}

  module.exports = tokenExtraction;