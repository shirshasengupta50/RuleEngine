const express = require('express');

const { apiV1ruleRoutes } = require('./v1/index');

const router = express.Router();

router.use('/v1', apiV1ruleRoutes);

module.exports = router;