const { Router } = require('express');
const { login, register } = require('../controllers/users.controller');

const topsRouters = Router();

topsRouters.post('/login', login);
topsRouters.post('/register', register);

module.exports = topsRouters;
