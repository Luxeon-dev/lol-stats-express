const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('../swagger.json');

const options = {};

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson, options));

module.exports = router;
