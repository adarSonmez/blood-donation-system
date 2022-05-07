const { Router } = require('express');
const {
  donation,
  checkDonorId,
} = require('../controllers/donations.controller');

const donationsRouter = Router();

donationsRouter.post('/', donation);
donationsRouter.post('/check-donor', checkDonorId);

module.exports = donationsRouter;
