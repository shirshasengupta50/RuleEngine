import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const RuleModification = () => {
  const [modificationType, setModificationType] = useState('updateValue');
  const [fieldName, setFieldName] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newOperator, setNewOperator] = useState('');
  const [newConditionField, setNewConditionField] = useState('');
  const [newConditionOperator, setNewConditionOperator] = useState('');
  const [newConditionValue, setNewConditionValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleModifyRule = async () => {
    try {
      const modification = { type: modificationType };

      if (modificationType === 'updateValue') {
        modification.fieldName = fieldName;
        modification.newValue = newValue;
      } else if (modificationType === 'changeOperator') {
        modification.newOperator = newOperator;
      } else if (modificationType === 'addCondition') {
        modification.newCondition = {
          left: { field: newConditionField },
          operator: newConditionOperator,
          right: { value: newConditionValue },
        };
      }

      const response = await axios.patch('http://127.0.0.1:5555/api/v1/modifyRule', modification); // No ruleID
      setResponseMessage('Rule modified successfully!');
    //   onRuleModified(response.data);
    } catch (error) {
      console.error('Error modifying rule:', error);
      setResponseMessage('Failed to modify rule.');
    }
  };

  return (
    <div>
      <h3>Modify Rule</h3>
      <select value={modificationType} onChange={(e) => setModificationType(e.target.value)}>
        <option value="updateValue">Update Value</option>
        <option value="changeOperator">Change Operator</option>
        <option value="addCondition">Add Condition</option>
      </select>

      {modificationType === 'updateValue' && (
        <>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="Field Name"
          />
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="New Value"
          />
        </>
      )}

      {modificationType === 'changeOperator' && (
        <input
          type="text"
          value={newOperator}
          onChange={(e) => setNewOperator(e.target.value)}
          placeholder="New Operator"
        />
      )}

      {modificationType === 'addCondition' && (
        <>
          <input
            type="text"
            value={newConditionField}
            onChange={(e) => setNewConditionField(e.target.value)}
            placeholder="Condition Field"
          />
          <input
            type="text"
            value={newConditionOperator}
            onChange={(e) => setNewConditionOperator(e.target.value)}
            placeholder="Condition Operator"
          />
          <input
            type="text"
            value={newConditionValue}
            onChange={(e) => setNewConditionValue(e.target.value)}
            placeholder="Condition Value"
          />
        </>
      )}

      <button className="evaluate-btn" onClick={handleModifyRule}>Modify Rule</button>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default RuleModification;
