const { Router } = require('express')
const {
  getTopTenReceptionists,
  getTopTenHospitals,
  getTopTenDonors,
} = require('../controllers/tops.controller')

const topsRouters = Router()

topsRouters.get('/top-ten-receptionists', getTopTenReceptionists)
topsRouters.get('/top-ten-hospitals', getTopTenHospitals)
topsRouters.get('/top-ten-donors', getTopTenDonors)

module.exports = topsRouters
