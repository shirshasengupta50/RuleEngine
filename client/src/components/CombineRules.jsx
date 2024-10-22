import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const CombineRules = () => {
  const [rules, setRules] = useState(['']);
  const [combinedAST, setCombinedAST] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (index, event) => {
    const updatedRules = [...rules];
    updatedRules[index] = event.target.value;
    setRules(updatedRules);
  };

  const addRule = () => {
    setRules([...rules, '']);
  };

  const removeRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleCombineRules = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/api/v1/combineRules', { rules });
      setCombinedAST(response.data.data);
      setResponseMessage('Rules combined successfully!');
    } catch (error) {
      console.error('Error combining rules:', error);
      setResponseMessage('Failed to combine rules.');
    }
  };

  return (
    <div>
      <h3>Combine Rules</h3>
      <div>
        {rules.map((rule, index) => (
          <div className="rule-container" key={index}>
            <input
              type="text"
              value={rule}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Enter rule"
            />
            <button className="remove-button" onClick={() => removeRule(index)}>Remove</button>
          </div>
        ))}
        <button className="add-attribute-btn" onClick={addRule}>Add Rule</button>
      </div>
      <button className="evaluate-btn" onClick={handleCombineRules}>Combine Rules</button>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
      {combinedAST && <p>Combined AST: {JSON.stringify(combinedAST)}</p>}
    </div>
  );
};

export default CombineRules;
