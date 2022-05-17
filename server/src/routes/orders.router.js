const { Router } = require('express');
const {
  orderBlood,
  deleteOrderById,
  getOrders,
} = require('../controllers/orders.controller');

const ordersRouter = Router();

ordersRouter.post('/order-blood', orderBlood);
ordersRouter.get('/', getOrders);
ordersRouter.delete('/', deleteOrderById);

module.exports = ordersRouter;
