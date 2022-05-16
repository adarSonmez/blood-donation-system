const { Router } = require('express');
const {
  login,
  register,
  decodeToken,
} = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.post('/decode', decodeToken);

module.exports = usersRouter;
