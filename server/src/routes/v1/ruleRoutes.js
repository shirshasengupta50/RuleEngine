const express = require('express');
const { ruleController } = require('../../controller/index');

const router = express.Router();

router.post('/createRule', ruleController.ruleCreate);

module.exports = router;