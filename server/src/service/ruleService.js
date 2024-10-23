const { RuleRepository } = require('../repository/index');
const { RuleError } = require('../utils/errors/index');
const { buildAST, combine_rules, evaluateASTNode, modificationAST } = require('../utils/helper/index');
const { updateValue, changeOperator, addCondition } = modificationAST

class RuleService {

    constructor(){
        this.ruleRepository = new RuleRepository();
    }

    async createRule(ruleString){
        try {
            
            const ast = buildAST(ruleString);

            const rule = {
                ruleID : 1,
                ruleName : "Main Rule",
                root : ast
            };

            const ruleFormed = await this.ruleRepository.create(rule);

            return ruleFormed.root;

        } catch (error) {
            if (error instanceof RuleError) {
                console.log(`Rule creation error: ${error.message}`);
              } else {
                console.log('Unknown error occurred during rule creation');
              }
              throw error;
        }
    }

    async combineRules(rules){
        try {

            const rulesList = Object.values(rules);

            const combineRuleString = combine_rules(rulesList);

            const ast = buildAST(combineRuleString);

            const rule = {
                ruleID : 1,
                ruleName : "Main Rule",
                root : ast
            };

            const ruleFormed = await this.ruleRepository.create(rule);

            return ruleFormed.root;
            
        } catch (error) {
            if (error instanceof RuleError) {
                console.log(`Rule creation error: ${error.message}`);
              } else {
                console.log('Unknown error occurred during rule creation');
              }
              throw error;
        }
    }

    async evaluateRule(data){
        try {
            console.log(data);
            const rule = await this.ruleRepository.get();
            const astRule = rule[0].root;

            const { _id, ...ruleWithoutId } = astRule;

            const response = evaluateASTNode(ruleWithoutId, data);
            return response;
        } catch (error) {
            if (error instanceof RuleError) {
                console.log(`Rule creation error: ${error.message}`);
              } else {
                console.log('Unknown error occurred during rule creation');
              }
              throw error;
        }
    }

    async modifyRule(modification) {
        try {
            const rule = await this.ruleRepository.get();

            let ast = rule[0].root;
            
            switch (modification.type) {
                case 'updateValue':
                    updateValue(ast, modification.fieldName, modification.newValue);
                    break;
                case 'changeOperator':
                    changeOperator(ast, modification.newOperator);
                    break;
                case 'addCondition':
                    addCondition(ast, modification.newCondition);
                    break;
                default:
                    throw new RuleError(`Invalid modification type: ${modification.type}`);
            }

            await this.ruleRepository.update(1, { root: ast });
            return ast;
            
        } catch (error) {
            if (error instanceof RuleError) {
                console.log(`Modification error: ${error.message}`);
            } else {
                console.log(error);
                console.log('Unknown error occurred during rule modification');
            }
            throw error;
        }
    }
}


module.exports = RuleService;