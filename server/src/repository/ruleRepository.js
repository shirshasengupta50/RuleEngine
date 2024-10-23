const { Rule } = require('../models/index');

class RuleRepository {
    async create(rule){
        try {
            const ruleFetched = await Rule.find({
                ruleID : 1
            });

            if(ruleFetched){
                await Rule.deleteOne({ruleID: 1});
            }

            const ruleFormed = await Rule.create(rule);
            return ruleFormed;

        } catch (error) {
            console.log(`Error Occured in create Repo Layer`);
            throw error;
        }
    }

    async get(){
        try {
            
            const ruleFetched = await Rule.find({
                ruleID : 1
            }).lean();
            return ruleFetched;

        } catch (error) {
            console.log(`Error Occured in get Repo Layer`);
            throw error;
        }
    }

    async update(ruleID, data){
        try {
            const updatedRule = await Rule.findOneAndUpdate({ruleID: ruleID}, data);
            return updatedRule;
        } catch (error) {
            console.log(`Error Occured in update Repo Layer`);
            throw error;
        }
    }
}

module.exports = RuleRepository;