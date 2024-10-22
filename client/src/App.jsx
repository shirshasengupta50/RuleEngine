import React, { useState } from 'react';
import RuleInput from './components/RuleInput';
import RuleEvaluation from './components/RuleEvaluation';

const App = () => {
  const [rules, setRules] = useState([]);

  const handleRuleCreated = (rule) => {
    setRules([...rules, rule]);
  };

  return (
    <div>
      <h1>Rule Engine</h1>
      <RuleInput onRuleCreated={handleRuleCreated} />
      <RuleEvaluation />
    </div>
  );
};

export default App;
