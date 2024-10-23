const { RuleService } = require('../service/index');

const ruleService = new RuleService();

const ruleCreate = async(req, res) => {
    try {
        const { ruleString } = req.body;
        const response = await ruleService.createRule(ruleString);

        res.status(201).json({
            data : response,
            success : true,
            error : {},
            message : "Rule Created Successfully"
        })
    } catch (error) {
        console.log(error);
        console.log("Error in Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Create Rule"
        });
    }
}

const ruleCombine = async(req, res) => {
    try {
        const ruleStrings = req.body;
        console.log(ruleStrings);
        const response = await ruleService.combineRules(ruleStrings);

        res.status(201).json({
            data : response,
            success : true,
            error : {},
            message : "Rule Created Successfully"
        })
    } catch (error) {
        console.log(error);
        console.log("Error in Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Create Rule"
        });
    }
}

const ruleEvaluate = async(req, res) => {
    try {
        const { data } = req.body;
        const response = await ruleService.evaluateRule(data);

        res.status(201).json({
            data : response,
            success : true,
            error : {},
            message : "Rule Created Successfully"
        })
    } catch (error) {
        console.log(error);
        console.log("Error in Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Create Rule"
        });
    }
}

const ruleModify = async(req, res) => {
    try {
        const modification = req.body;
        const response = await ruleService.modifyRule(modification);

        res.status(201).json({
            data : response,
            success : true,
            error : {},
            message : "Rule Modified Successfully"
        })
    } catch (error) {
        console.log("Error in Controller Layer");
        return res.status(500).json({
            data: {},
            error: error,
            success: false,
            message: "Failed to Modify Rule"
        });
    }
}

module.exports = {
    ruleCreate,
    ruleEvaluate,
    ruleCombine,
    ruleModify
}
