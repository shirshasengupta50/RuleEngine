import React, { useState } from 'react';
import axios from 'axios';

const RuleEvaluation = () => {
  const [attributes, setAttributes] = useState([{ name: '', value: '' }]);
  const [ruleId, setRuleId] = useState('');
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Handle input changes for dynamic attributes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAttributes = [...attributes];
    updatedAttributes[index][name] = value;
    setAttributes(updatedAttributes);
  };

  // Add a new attribute row
  const addAttribute = () => {
    setAttributes([...attributes, { name: '', value: '' }]);
  };

  // Remove an attribute row
  const removeAttribute = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };

  // Handle the submission of the evaluation data
  const handleEvaluate = async () => {
    const evaluationData = attributes.reduce((acc, attr) => {
      if (attr.name && attr.value) {
        acc[attr.name] = attr.value;
      }
      return acc;
    }, {});

    try {
      const response = await axios.post('http://127.0.0.1:5555/api/v1/evaluateRule', { data: evaluationData });
      setEvaluationResult(response.data.data);
    } catch (error) {
      console.error('Error evaluating rule:', error);
      setEvaluationResult('Failed to evaluate rule.');
    }
  };

  return (
    <div>
      <h3>Evaluate Rule</h3>
      <input
        type="text"
        placeholder="Enter Rule ID"
        value={ruleId}
        onChange={(e) => setRuleId(e.target.value)}
      />
      <div>
        {attributes.map((attribute, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Attribute Name"
              value={attribute.name}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              name="value"
              placeholder="Attribute Value"
              value={attribute.value}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button onClick={() => removeAttribute(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addAttribute}>Add Attribute</button>
      </div>
      <button onClick={handleEvaluate}>Evaluate</button>
      {evaluationResult !== null && <p>Result: {evaluationResult ? 'Eligible' : 'Not Eligible'}</p>}
    </div>
  );
};

export default RuleEvaluation;
