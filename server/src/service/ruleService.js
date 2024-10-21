const { RuleRepository } = require('../repository/index');
const buildAST = require('../utils/buildAST');
const evaluateASTNode = require('../utils/evaluateAST');

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
            console.log(`Error Occured in create Service Layer`);
            throw error;
        }
    }

    async evaluateRule(data){
        try {
            const rule = await this.ruleRepository.get();
            const astRule = rule[0].root;

            const { _id, ...ruleWithoutId } = astRule;

            console.log(ruleWithoutId);

            const response = evaluateASTNode(ruleWithoutId, data);
            return response;
        } catch (error) {
            console.log(`Error Occured in evaluate Service Layer`);
            throw error;
        }
    }
}


module.exports = RuleService;