const db = require('../config/db');
const Bank = require('../models/banks.model');

function getBanks(req, res) {
  const sql = Bank.selectBanks;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
}

function getTotalDonatedBlood(req, res) {
  const sql = Bank.selectTotalDonatedBlood;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data[0]);
  });
}

function getLeastAvailableBloodType(req, res) {
  const sql = Bank.selectLeastAvailableBloodType;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data)[0];
  });
}

function getMostAvailableBloodType(req, res) {
  const sql = Bank.selectMostAvailableBloodType;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data)[0];
  });
}

module.exports = {
  getBanks,
  getTotalDonatedBlood,
  getLeastAvailableBloodType,
  getMostAvailableBloodType,
};
