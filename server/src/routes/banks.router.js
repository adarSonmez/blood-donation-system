const { Router } = require('express');
const {
  getTotalDonatedBlood,
  getLeastAvailableBloodType,
  getMostAvailableBloodType,
} = require('../controllers/banks.controller');

const banksRouter = Router();

banksRouter.get('/total-donated-blood', getTotalDonatedBlood);
banksRouter.get('/least-available-blood-type', getLeastAvailableBloodType);
banksRouter.get('/most-available-blood-type', getMostAvailableBloodType);

module.exports = banksRouter;