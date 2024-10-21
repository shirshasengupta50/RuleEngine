function evaluateConditionNode(node, data) {
    const fieldValue = data[node.left.field];
    const nodeValue = node.right.value;
  

    switch (node.operator.operator) {
      case '>':
        return fieldValue > nodeValue;
      case '<':
        return fieldValue < nodeValue;
      case '>=':
        return fieldValue >= nodeValue;
      case '<=':
        return fieldValue <= nodeValue;
      case '=':
        return fieldValue == nodeValue;
      case '!=':
        return fieldValue != nodeValue;
      default:
        throw new Error(`Unknown operator: ${node.operator}`);
    }
  }
  

  function evaluateASTNode(node, data) {
    if (node.type === 'condition') {

      return evaluateConditionNode(node, data);
    } else if (node.type === 'operator') {

      const leftEval = evaluateASTNode(node.left, data);  
      const rightEval = evaluateASTNode(node.right, data); 
  
      switch (node.operator) {
        case 'AND':
          return leftEval && rightEval;
        case 'OR':
          return leftEval || rightEval;
        default:
          throw new Error(`Unknown logical operator: ${node.operator}`);
      }
    }
    throw new Error(`Unknown node type: ${node.type}`);
  }


  module.exports = evaluateASTNode;