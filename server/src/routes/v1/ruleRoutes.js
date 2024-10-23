const express = require('express');
const { ruleController } = require('../../controller/index');
const validateAttributesMiddleware = require('../../middleware/validateAtributes');

const router = express.Router();

router.post('/createRule', validateAttributesMiddleware, ruleController.ruleCreate);
router.post('/combineRules', ruleController.ruleCombine);
router.post('/evaluateRule', ruleController.ruleEvaluate);
router.patch('/modifyRule', ruleController.ruleModify);

module.exports = router;