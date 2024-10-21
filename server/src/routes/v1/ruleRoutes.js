const express = require('express');
const { ruleController } = require('../../controller/index');

const router = express.Router();

router.post('/createRule', ruleController.ruleCreate);
router.post('/evaluateRule', ruleController.ruleEvaluate);

module.exports = router;