const { Router } = require('express');
const {
  getBanks,
  getTotalDonatedBlood,
  getLeastAvailableBloodType,
  getMostAvailableBloodType,
  getNumAvailableBlood,
} = require('../controllers/banks.controller');

const banksRouter = Router();

banksRouter.get('/', getBanks);
banksRouter.get('/total-donated-blood', getTotalDonatedBlood);
banksRouter.get('/total-available', getNumAvailableBlood);
banksRouter.get('/least-available-blood-type', getLeastAvailableBloodType);
banksRouter.get('/most-available-blood-type', getMostAvailableBloodType);

module.exports = banksRouter;
