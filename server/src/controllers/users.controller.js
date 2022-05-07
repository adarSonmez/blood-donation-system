const jwt = require('jsonwebtoken');

const db = require('../config/db.config');
const User = require('../models/users.model');

function login(req, res) {
  const { email, password } = req.body;
  const sql = User.selectUserByEmail;

  db.query(sql, [email], (err, data) => {
    if (err) throw err;

    const user = data[0];

    if (!user)
      res.status(400).json({ success: false, message: 'User is not found!' });
    else if (user.password !== password)
      res.status(400).json({ success: false, message: 'Wrong password!' });
    else {
      const token = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
      res
        .header('auth-token', token)
        .json({ success: true, message: 'Logged in!' });
    }
  });
}

function register(req, res) {
  const { full_name, e_mail, password, phone, address, user_type } = req.body;
  const selectUser = User.selectUserByEmail;

  db.query(selectUser, [e_mail], (err, data) => {
    if (err) throw err;

    if (data[0])
      return res.json({ success: false, message: 'User already registered!' });
  });

  const regUser = User.insertUser;

  db.query(
    regUser,
    [full_name, e_mail, password, phone, address, user_type],
    (err, data) => {
      if (err) throw err;

      res.json({ success: true, message: 'Successfully registered!' });
    }
  );
}

module.exports = {
  login,
  register,
};
