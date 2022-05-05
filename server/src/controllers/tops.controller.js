const db = require('../config/db');
const Top = require('../models/tops.model');

function getTopTenReceptionists(req, res) {
  const sql = Top.topTenReceptionists;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
}

function getTopTenHospitals(req, res) {
  const sql = Top.topTenHospitals;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
}

function getTopTenDonors(req, res) {
  const sql = Top.topTenDonors;

  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
}

module.exports = {
  getTopTenReceptionists,
  getTopTenHospitals,
  getTopTenDonors,
};
