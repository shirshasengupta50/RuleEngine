import React, { useState } from 'react';
import axios from 'axios';

const RuleInput = ({ onRuleCreated }) => {
  const [rule, setRuleString] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleCreateRule = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/api/v1/createRule', { ruleString: rule });
      setResponseMessage('Rule created successfully!');
      onRuleCreated(response.data);
      setRuleString('');
    } catch (error) {
      console.error('Error creating rule:', error);
      setResponseMessage('Failed to create rule.');
    }
  };

  return (
    <div>
      <h3>Create Rule</h3>
      <input
        type="text"
        value={rule}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule string"
      />
      <button onClick={handleCreateRule}>Create Rule</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default RuleInput;
