const { RuleRepository } = require('../repository/index');
const buildAST = require('../utils/buildAST');

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
}


module.exports = RuleService;