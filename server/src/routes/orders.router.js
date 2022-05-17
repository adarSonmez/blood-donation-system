const { Router } = require('express');
const {
  orderBlood,
  getOrdersByHospitalId,
  deleteOrderById,
} = require('../controllers/orders.controller');

const ordersRouter = Router();

ordersRouter.post('/order-blood', orderBlood);
ordersRouter.post('/delete', deleteOrderById);
ordersRouter.post('/orders-by-hospital-id', getOrdersByHospitalId);

module.exports = ordersRouter;
