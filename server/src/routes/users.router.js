const { Router } = require('express');
const {
  login,
  register,
  decodeToken,
  getRandomManagerId,
  updateUser,
  getUserByEmail,
} = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.post('/decode', decodeToken);
usersRouter.get('/random-manager-id', getRandomManagerId);
usersRouter.get('/', getUserByEmail);
usersRouter.put('/', updateUser);

module.exports = usersRouter;
