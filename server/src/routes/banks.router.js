const { Router } = require('express')
const {
  getBanks,
  getTotalDonatedBlood,
  getNumAvailableBlood,
  getAllBloodTypes,
} = require('../controllers/banks.controller')

const banksRouter = Router()

banksRouter.get('/', getBanks)
banksRouter.get('/total-donated-blood', getTotalDonatedBlood)
banksRouter.get('/total-available', getNumAvailableBlood)
banksRouter.get('/all-blood-types', getAllBloodTypes)

module.exports = banksRouter
