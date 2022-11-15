const { sign, verify } = require('jsonwebtoken')

const db = require('../config/db.config')
const User = require('../models/users.model')

function login(req, res) {
  const { e_mail, password } = req.body
  const sql = User.selectUserByEmail

  db.query(sql, [e_mail], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    const user = data[0]

    if (!user) res.json({ success: false, message: 'User is not found!' })
    else if (user.password !== password)
      res.json({ success: false, message: 'Wrong password!' })
    else {
      const token = sign(
        {
          e_mail: user.e_mail,
          user_type: user.user_type,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '24h',
        }
      )
      res.json({ success: true, message: 'Logged in!', token })
    }
  })
}

function register(req, res) {
  const { full_name, e_mail, password, phone, address, user_type } = req.body
  const selectUser = User.selectUserByEmail

  db.query(selectUser, [e_mail], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    if (data[0])
      return res.json({ success: false, message: 'User already registered!' })
    else {
      const regUser = User.insertUser

      db.query(
        regUser,
        [full_name, e_mail, password, phone, address, user_type],
        (err, data) => {
          if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

          res.json({ success: true, message: 'Successfully registered!' })
        }
      )
    }
  })
}

function decodeToken(req, res) {
  let token = req.body.token

  if (!token) return res.json({ success: false, message: 'Invalid Token!' })

  try {
    const decoded = verify(token, process.env.TOKEN_SECRET)
    return res.json({
      success: true,
      message: 'Token Verified!',
      user: decoded,
    })
  } catch (err) {
    console.error(err.message)
  }
}

function getRandomManager(req, res) {
  const sql = User.selectRandomManager

  db.query(sql, (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    res.json(data[0])
  })
}

function getUserByEmail(req, res) {
  const { e_mail } = req.query
  const sql = User.selectUserByEmail

  if (!e_mail)
    return res.json({ success: false, message: 'Email is not specified' })

  db.query(sql, [e_mail], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    res.json(data[0])
  })
}

function updateUser(req, res) {
  const sql = User.updateUserByEmail
  const { password, phone, address, e_mail } = req.body

  db.query(sql, [password, phone, address, e_mail], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    res.json({ success: true, message: 'User updated!' })
  })
}

function deleteUser(req, res) {
  const sql = User.DeleteUserById
  const { user_id } = req.query

  db.query(sql, [user_id], (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
(res, err)

    res.json({ success: true, message: 'User deleted!' })
  })
}

module.exports = {
  login,
  register,
  decodeToken,
  getRandomManager,
  getUserByEmail,
  updateUser,
  deleteUser,
}
