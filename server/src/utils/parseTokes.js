const parseValue = require('./parseValues');

function parseTokens(tokens) {
  const stack = [];
  let currentNode = null;

  while (tokens.length > 0) {
    const token = tokens.shift();

    if (token === '(') {

      const subExpression = parseTokens(tokens);
      if (currentNode) {
        if (!currentNode.left) {
          currentNode.left = subExpression;
        } else {
          currentNode.right = subExpression;
        }
      } else {
        currentNode = subExpression;
      }
    } else if (token === ')') {

      return currentNode;
    } else if (token === 'AND' || token === 'OR') {

      const operatorNode = {
        type: 'operator',
        operator: token,
        left: currentNode,
        right: null
      };
      currentNode = operatorNode;
    } else if (['>', '<', '>=', '<=', '=', '!='].includes(token)) {

      const leftField = stack.pop(); 
      const value = tokens.shift(); 

      const fieldNode = {
        type: 'field',
        field: leftField 
      };

      const operatorNode = {
        type: 'operator',
        operator: token 
      };

      const valueNode = {
        type: 'value',
        value: parseValue(value) 
      };

      const conditionNode = {
        type: 'condition',
        left: fieldNode, 
        operator: operatorNode, 
        right: valueNode 
      };

      if (currentNode) {
        if (!currentNode.left) {
          currentNode.left = conditionNode;
        } else {
          currentNode.right = conditionNode;
        }
      } else {
        currentNode = conditionNode;
      }
    } else {
      stack.push(token);
    }
  }
  return currentNode;
}

module.exports = parseTokens;