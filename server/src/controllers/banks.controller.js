const db = require('../config/db.config')
const Bank = require('../models/banks.model')
const { completeMissingBloodTypes } = require('../utils/banks.utils')
const { internalServerError } = require('../utils/error.utils')

function getBanks(req, res) {
  const sql = Bank.selectBanks

  db.query(sql, (err, data) => {
    if (err) internalServerError(res, err)
    res.json(data)
  })
}

function getTotalDonatedBlood(req, res) {
  const sql = Bank.selectTotalDonatedBlood

  db.query(sql, (err, data) => {
    if (err) internalServerError(res, err)
    res.json(data[0])
  })
}

function getNumAvailableBlood(req, res) {
  const sql = Bank.selectNumAvailableBlood

  db.query(sql, (err, data) => {
    if (err) internalServerError(res, err)
    res.json(data[0])
  })
}

function getLeastAvailableBloodType(req, res) {
  const sql = Bank.selectAvailableBloodTypes

  db.query(sql, (err, data) => {
    if (err) internalServerError(res, err)
    data = completeMissingBloodTypes(data)
    res.json(data[7])
  })
}

function getMostAvailableBloodType(req, res) {
  const sql = Bank.selectAvailableBloodTypes

  db.query(sql, (err, data) => {
    if (err) internalServerError(res, err)
    data = completeMissingBloodTypes(data)
    res.json(data[0])
  })
}

function getAvailableBloodTypes(req, res) {
  const sql = Bank.selectAvailableBloodTypes

  db.query(sql, (err, data) => {
    if (err) internalServerError(res, err)
    data = completeMissingBloodTypes(data)
    res.json(data)
  })
}

module.exports = {
  getBanks,
  getTotalDonatedBlood,
  getNumAvailableBlood,
  getLeastAvailableBloodType,
  getMostAvailableBloodType,
  getAvailableBloodTypes,
}
