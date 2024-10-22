function combineTwoRules(rule1, rule2, operator) {
    return `(${rule1} ${operator} ${rule2})`;
  }
  
  // Function to split rule string into its component expressions based on AND/OR
  function splitRule(rule) {
    const result = [];
    let depth = 0;
    let lastSplit = 0;
  
    // Iterate through the rule string
    for (let i = 0; i < rule.length; i++) {
      const char = rule[i];
      
      if (char === '(') {
        depth++;
      } else if (char === ')') {
        depth--;
      }
      
      // Check for logical operator outside parentheses
      if ((rule.slice(i, i + 3) === 'AND' || rule.slice(i, i + 2) === 'OR') && depth === 0) {
        const opLength = rule.slice(i, i + 3) === 'AND' ? 3 : 2;
        result.push(rule.slice(lastSplit, i).trim());  // Push the part before the operator
        result.push(rule.slice(i, i + opLength));      // Push the operator
        lastSplit = i + opLength;
      }
    }
    result.push(rule.slice(lastSplit).trim());  // Push the remaining part
    return result;
  }
  
  // Function to get the most frequent operator in a list of rule strings
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
  
    // Return the most frequent operator, default to AND if counts are equal
    return operatorCount.AND >= operatorCount.OR ? 'AND' : 'OR';
  }
  
  // Balanced Binary Tree Strategy to combine multiple rule strings into one
  function combine_rules(ruleStrings) {
    // Base case: if there's only one rule, return it
    if (ruleStrings.length === 1) {
      return ruleStrings[0];
    }
  
    // Determine the most frequent operator across all rules
    const operator = getMostFrequentOperator(ruleStrings);
  
    // Recursive function to combine rule strings
    function recursiveCombine(rulesArray) {
      // Base case: if the array is reduced to one element, return it
      if (rulesArray.length === 1) {
        return rulesArray[0];
      }
  
      let combinedRules = [];
  
      // Combine rule strings in pairs
      for (let i = 0; i < rulesArray.length; i += 2) {
        if (i + 1 < rulesArray.length) {
          // Combine two rules with the most frequent operator
          const combined = combineTwoRules(rulesArray[i], rulesArray[i + 1], operator);
          combinedRules.push(combined);
        } else {
          // If there's an odd rule left, push it to the next level
          combinedRules.push(rulesArray[i]);
        }
      }
  
      // Recurse with the combined rules
      return recursiveCombine(combinedRules);
    }
  
    // Start combining the rule strings
    return recursiveCombine(ruleStrings);
  }

module.exports = combine_rules;