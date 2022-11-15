const { Router } = require('express')
const {
  login,
  register,
  decodeToken,
  updateUser,
  getUserByEmail,
  getRandomManager,
  deleteUser,
} = require('../controllers/users.controller')

const usersRouter = Router()

usersRouter.post('/login', login)
usersRouter.post('/register', register)
usersRouter.post('/decode', decodeToken)
usersRouter.get('/random-manager', getRandomManager)
usersRouter.get('/', getUserByEmail)
usersRouter.put('/', updateUser)
usersRouter.delete('/', deleteUser)

module.exports = usersRouter
