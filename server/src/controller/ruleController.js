const { RuleService } = require('../service/index');

const ruleService = new RuleService();

const ruleCreate = async(req, res) => {
    try {
        const ruleString = req.body;
        const response = await ruleService.createRule(ruleString);

        res.status(201).json({
            data : response,
            success : true,
            error : {},
            message : "Rule Created Successfully"
        })
    } catch (error) {
        console.log("Error in Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Create Rule"
        });
    }
}

module.exports = {
    ruleCreate
}