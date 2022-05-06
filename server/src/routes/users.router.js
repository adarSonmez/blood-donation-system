const { Router } = require('express');
const { login, register } = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.post('/login', login);
usersRouter.post('/register', register);

module.exports = usersRouter;
