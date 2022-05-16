const { sign, verify } = require('jsonwebtoken');

const db = require('../config/db.config');
const User = require('../models/users.model');

function login(req, res) {
  const { email, password } = req.body;
  const sql = User.selectUserByEmail;

  db.query(sql, [email], (err, data) => {
    if (err) throw err;

    const user = data[0];

    if (!user) res.json({ success: false, message: 'User is not found!' });
    else if (user.password !== password)
      res.json({ success: false, message: 'Wrong password!' });
    else {
      const token = sign(
        {
          id: user.user_id,
          name: user.full_name,
          email: user.e_mail,
          type: user.user_type,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '24h',
        }
      );
      res.json({ success: true, message: 'Logged in!', token });
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

function decodeToken(req, res) {
  let token = req.body.token;

  if (!token) return res.json({ loggedIn: false, message: 'Please login!' });

  try {
    const decoded = verify(token, process.env.TOKEN_SECRET);
    const { name, email, type, id } = decoded;
    return res.json({ loggedIn: true, user: { name, email, type, id } });
  } catch {
    return res.json({ loggedIn: false, message: 'Invalid token!' });
  }
}

module.exports = {
  login,
  register,
  decodeToken,
};
