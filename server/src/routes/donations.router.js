const { Router } = require('express');
const { donation } = require('../controllers/donations.controller');

const donationsRouter = Router();

donationsRouter.post('/', donation);

module.exports = donationsRouter;
