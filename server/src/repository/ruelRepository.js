const { Rule } = require('../models/index');

class RuleRepository {
    async create(rule){
        try {

            const ruleFormed = await Rule.create(rule);
            return ruleFormed;

        } catch (error) {
            console.log(`Error Occured in create Repo Layer`);
            throw error;
        }
    }

    async get(id){
        try {
            
            const ruleFetched = await Rule.find({
                ruleID : id
            });
            return ruleFetched;

        } catch (error) {
            console.log(`Error Occured in get Repo Layer`);
            throw error;
        }
    }
}

module.exports = RuleRepository;