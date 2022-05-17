const { Router } = require('express');
const { orderBlood } = require('../controllers/orders.controller');

const ordersRouter = Router();

ordersRouter.post('/order-blood', orderBlood);

module.exports = ordersRouter;
