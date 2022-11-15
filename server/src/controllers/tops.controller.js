const db = require('../config/db.config')
const Top = require('../models/tops.model')

function getTopTenReceptionists(req, res) {
  const sql = Top.selectTopTenReceptionists

  db.query(sql, (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
    res.json(data)
  })
}

function getTopTenHospitals(req, res) {
  const sql = Top.selectTopTenHospitals

  db.query(sql, (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
    res.json(data)
  })
}

function getTopTenDonors(req, res) {
  const sql = Top.selectTopTenDonors

  db.query(sql, (err, data) => {
    if (err)  return res.json({ error: true, success: false, message: err.message })
    res.json(data)
  })
}

module.exports = {
  getTopTenReceptionists,
  getTopTenHospitals,
  getTopTenDonors,
}
