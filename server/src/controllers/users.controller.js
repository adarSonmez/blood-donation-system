const jwt = require('jsonwebtoken');

const db = require('../config/db.config');
const User = require('../models/users.model');

function login(req, res) {
  const { email, password } = req.body;
  const sql = User.selectUserByEmail;

  db.query(sql, [email], (err, data) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });

    const user = data[0];

    if (!user)
      res.status(400).json({ success: false, message: 'User not found!' });
    else if (user.password !== password)
      res.status(400).json({ success: false, message: 'Wrong password!' });
    else {
      const token = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET);
      res.header('auth-token', token).json({ success: true, message: 'Logged in!' });
    }
  });
}

function register(req, res) {
  const sql = User.insertUser;
  const { full_name, e_mail, password, phone, address, user_type } = req.body;

  // TO DO: handle registration issues

  db.query(
    sql,
    [full_name, e_mail, password, phone, address, user_type],
    (err, data) => {
      if (err) throw err;
      // res.json(data[0]);
    }
  );
}

module.exports = {
  login,
  register,
};
