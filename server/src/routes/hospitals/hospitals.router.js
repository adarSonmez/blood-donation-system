const { Router } = require('express');
const { getAllHospitals } = require('./hospitals.controller');

const hospitalRouter = Router();

hospitalRouter.get('/hospitals', getAllHospitals);

module.exports = hospitalRouter;
