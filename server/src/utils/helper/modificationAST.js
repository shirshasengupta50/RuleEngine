const updateValue = (node, fieldName, newValue) => {

    if (node.type === 'condition') {
        if (node.left.field === fieldName) {
            node.right.value = newValue; 
        }
    } else if (node.type === 'operator') {
        if (node.left) updateValue(node.left, fieldName, newValue);
        if (node.right) updateValue(node.right, fieldName, newValue);
    }
}

const changeOperator = (node, newOperator) => {

    if (node.type === 'operator') {
        node.operator = newOperator;
    } else if (node.type === 'condition') {
        throw new RuleError("Cannot change operator of a condition node.");
    } else if (node.type === 'operator') {
        if (node.left) changeOperator(node.left, newOperator);
        if (node.right) changeOperator(node.right, newOperator);
    }
}

const addCondition = (node, newCondition) => {
    const conditionNode = {
        type: 'condition',
        left: newCondition.left,
        operator: {
            type: 'operator',
            operator: newCondition.operator
        },
        right: newCondition.right
    };

    if (node.type === 'operator') {
        if (!node.right) {
            node.right = conditionNode; 
        } else {
            const newOperatorNode = {
                type: 'operator',
                operator: node.operator.operator, 
                left: node.right,
                right: conditionNode
            };
            node.right = newOperatorNode;
        }
    } else {
        throw new RuleError("Cannot add condition to a non-operator node.");
    }
}

module.exports = {
    updateValue,
    changeOperator,
    addCondition
}