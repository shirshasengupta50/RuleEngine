function combineTwoRules(rule1, rule2, operator) {
    return `(${rule1} ${operator} ${rule2})`;
  }

  function splitRule(rule) {
    const result = [];
    let depth = 0;
    let lastSplit = 0;
  
    for (let i = 0; i < rule.length; i++) {
      const char = rule[i];
      
      if (char === '(') {
        depth++;
      } else if (char === ')') {
        depth--;
      }

      if ((rule.slice(i, i + 3) === 'AND' || rule.slice(i, i + 2) === 'OR') && depth === 0) {
        const opLength = rule.slice(i, i + 3) === 'AND' ? 3 : 2;
        result.push(rule.slice(lastSplit, i).trim());  
        result.push(rule.slice(i, i + opLength));      
        lastSplit = i + opLength;
      }
    }
    result.push(rule.slice(lastSplit).trim());  
    return result;
  }
  
  function getMostFrequentOperator(rules) {
    const operatorCount = { AND: 0, OR: 0 };
  
    rules.forEach(rule => {
      const tokens = splitRule(rule);
      tokens.forEach(token => {
        if (token === 'AND') {
          operatorCount.AND++;
        } else if (token === 'OR') {
          operatorCount.OR++;
        }
      });
    });
  
    return operatorCount.AND >= operatorCount.OR ? 'AND' : 'OR';
  }
  
  function combine_rules(ruleStrings) {
    if (ruleStrings.length === 1) {
      return ruleStrings[0];
    }
  
    const operator = getMostFrequentOperator(ruleStrings);

    function recursiveCombine(rulesArray) {

      if (rulesArray.length === 1) {
        return rulesArray[0];
      }
  
      let combinedRules = [];
  
      for (let i = 0; i < rulesArray.length; i += 2) {
        if (i + 1 < rulesArray.length) {

          const combined = combineTwoRules(rulesArray[i], rulesArray[i + 1], operator);
          combinedRules.push(combined);
        } else {

          combinedRules.push(rulesArray[i]);
        }
      }

      return recursiveCombine(combinedRules);
    }
  
    return recursiveCombine(ruleStrings);
  }

module.exports = combine_rules;