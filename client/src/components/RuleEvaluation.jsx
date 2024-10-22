import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const RuleEvaluation = () => {
  const [attributes, setAttributes] = useState([{ name: '', value: '' }]);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAttributes = [...attributes];
    updatedAttributes[index][name] = value;
    setAttributes(updatedAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { name: '', value: '' }]);
  };

  const removeAttribute = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(index, 1);
    setAttributes(updatedAttributes);
  };

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
      <div>
        {attributes.map((attribute, index) => (
          <div className="attribute-container" key={index}>
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
            <button className="remove-button" onClick={() => removeAttribute(index)}>Remove</button>
          </div>
        ))}
        <button className="add-attribute-btn" onClick={addAttribute}>Add Attribute</button>
      </div>
      <button className="evaluate-btn" onClick={handleEvaluate}>Evaluate</button>
      {evaluationResult !== null && <p className="response-message">Result: {evaluationResult ? 'Eligible' : 'Not Eligible'}</p>}
    </div>
  );
};

export default RuleEvaluation;
