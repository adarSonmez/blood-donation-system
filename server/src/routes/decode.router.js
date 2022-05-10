const { Router } = require('express');
const { decodeToken } = require('../controllers/decode.controller');

const decodeRouter = Router();

decodeRouter.post('/', decodeToken);

module.exports = decodeRouter;
