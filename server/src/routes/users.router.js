const { Router } = require('express');
const {
  login,
  register,
  decodeToken,
  getRandomManagerId,
} = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.post('/decode', decodeToken);
usersRouter.get('/random-manager-id', getRandomManagerId);

module.exports = usersRouter;
