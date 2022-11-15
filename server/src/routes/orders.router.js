const { Router } = require('express')
const {
  orderBlood,
  deleteOrderById,
  getOrders,
  updateOrder,
} = require('../controllers/orders.controller')

const ordersRouter = Router()

ordersRouter.post('/order-blood', orderBlood)
ordersRouter.get('/', getOrders)
ordersRouter.delete('/', deleteOrderById)
ordersRouter.put('/', updateOrder)

module.exports = ordersRouter
