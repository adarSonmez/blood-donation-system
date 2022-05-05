const db = require('../config/db');
const Blood = require('../models/banks.model');

function getTotalDonatedBlood(req, res) {
  const sql = Blood.totalDonatedBlood;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data[0]);
  });
}

function getLeastAvailableBloodType(req, res) {
  const sql = Blood.leastAvailableBloodType;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data)[0];
  });
}

function getMostAvailableBloodType(req, res) {
  const sql = Blood.mostAvailableBloodType;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data)[0];
  });
}

module.exports = {
  getTotalDonatedBlood,
  getLeastAvailableBloodType,
  getMostAvailableBloodType,
};
