const db = require('../config/db');
const User = require('../models/users.model');

function login(req, res) {
  const sql = User.selectUserByEmail;

  // TO DO: handle login issues

  db.query(sql, [], (err, data) => {
    if (err) throw err;
    // res.json(data[0]);
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
