import React, { useState } from 'react';
import RuleInput from './components/RuleInput';
import RuleEvaluation from './components/RuleEvaluation';
import CombineRules from './components/CombineRules';
import './App.css'; 

const App = () => {
  const [rules, setRules] = useState([]);

  const handleRuleCreated = (rule) => {
    setRules([...rules, rule]);
  };

  return (
    <div className="container">
      <h1>Rule Engine</h1>
      <RuleInput onRuleCreated={handleRuleCreated} />
      <RuleEvaluation />
      <CombineRules />
    </div>
  );
};

export default App;
